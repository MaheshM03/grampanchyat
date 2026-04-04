// In-memory store - resets on server restart
let birthData = [];

const generateToken = () => {
  return 'BP' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
};

// Helper functions
const getBirthById = (id) => birthData.find(cert => cert.id === id);
const getBirthByTokenOrMobile = (tokenOrMobile) => {
  return birthData.find(cert => cert.token === tokenOrMobile || cert.mobile === tokenOrMobile);
};
const addBirthCert = (certData) => {
  const cert = { ...certData, id: Date.now().toString() };
  birthData.unshift(cert);
  return cert;
};
const updateBirthCert = (id, updates) => {
  const index = birthData.findIndex(cert => cert.id === id);
  if (index > -1) {
    birthData[index] = { ...birthData[index], ...updates };
    return birthData[index];
  }
  return null;
};

// Import payment verification
const { verifyPayment } = require('./paymentController');

// @desc Create new birth certificate application
// @route POST /api/birth-certificates
const createBirthCertificate = async (req, res) => {
  try {
    const { mobile, childDetails, fatherDetails, motherDetails, documents, payment } = req.body;

    // Validate Razorpay payment
    if (!payment || !payment.razorpay_payment_id || !payment.razorpay_order_id || !payment.razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Valid Razorpay payment details required (payment_id, order_id, signature)'
      });
    }

    // Verify signature
    const verifyBody = {
      razorpay_payment_id: payment.razorpay_payment_id,
      razorpay_order_id: payment.razorpay_order_id,
      razorpay_signature: payment.razorpay_signature,
      certificateType: 'birth'
    };
    const verifyResult = await verifyPayment({ body: verifyBody });
    if (!verifyResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Please try again.'
      });
    }

    // Payment verified, proceed

    const token = generateToken();
    
    const birthCertData = {
      token,
      mobile,
      childDetails,
      fatherDetails,
      motherDetails,
      documents,
      payment,
      status: 'pending',
      submittedAt: new Date()
    };

    const savedCert = addBirthCert(birthCertData);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        token,
        applicationId: savedCert.id,
        status: 'pending',
        submittedAt: savedCert.submittedAt
      }
    });
  } catch (error) {
    console.error('Create birth cert error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting application'
    });
  }
};

// @desc Get birth certificate by token/mobile
// @route GET /api/birth-certificates/:tokenOrMobile
const getBirthCertificate = async (req, res) => {
  try {
    const { tokenOrMobile } = req.params;
    
    const birthCert = getBirthByTokenOrMobile(tokenOrMobile);

    if (!birthCert) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: birthCert
    });
  } catch (error) {
    console.error('Get birth cert error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching application'
    });
  }
};

// @desc Update application status (admin)
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approvedBy } = req.body;

    const birthCert = getBirthById(id);
    if (!birthCert) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    birthCert.status = status;
    if (status === 'approved') {
      birthCert.approvedAt = new Date();
      birthCert.approvedBy = approvedBy;
    }

    updateBirthCert(id, { status, approvedAt: birthCert.approvedAt, approvedBy });

    res.json({
      success: true,
      data: birthCert
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllBirthCertificates = async (req, res) => {
  try {
    res.json({
      success: true,
      data: birthData.slice(),
      count: birthData.length
    });
  } catch (error) {
    console.error('Get all birth certs error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching certificates' });
  }
};

module.exports = {
  createBirthCertificate,
  getBirthCertificate,
  updateStatus,
  getAllBirthCertificates
};
