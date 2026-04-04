const nodemailer = require('nodemailer');

// In-memory store - resets on server restart
let contactStore = []; // ✅ FIXED: renamed from 'contactData' to avoid collision

// Helper
const addContact = (data) => { // ✅ FIXED: parameter renamed from 'contactData' to 'data'
  const contact = { ...data, id: Date.now().toString(), createdAt: new Date() };
  contactStore.unshift(contact); // ✅ now correctly pushes to the array
  return contact;
};

// ✅ Transporter now works because module loads without crashing
const transporter = nodemailer.createTransport({ // ✅ also fixed: createTransport (not createTransporter)
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// @route POST /api/contact
const sendContact = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Save to in-memory store
    addContact({ firstName, lastName, email, subject, message });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    res.json({ success: true, message: 'Message saved and emailed!' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { sendContact };