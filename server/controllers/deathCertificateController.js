// In-memory store - resets on server restart
let deathData = [];

const generateToken = () => {
  return 'DC' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
};

// Helper functions
const getDeathById = (id) => deathData.find(cert => cert.id === id);
const getDeathByTokenOrMobile = (tokenOrMobile) => {
  return deathData.find(cert => cert.token === tokenOrMobile || cert.informantDetails?.mobile === tokenOrMobile);
};
const addDeathCert = (certData) => {
  const cert = { ...certData, id: Date.now().toString() };
  deathData.unshift(cert);
  return cert;
};
const updateDeathCert = (id, updates) => {
  const index = deathData.findIndex(cert => cert.id === id);
  if (index > -1) {
    deathData[index] = { ...deathData[index], ...updates };
    return deathData[index];
  }
  return null;
};

// Import payment verification
const { verifyPayment } = require('./paymentController');

// @desc Create new death certificate application
// @route POST /api/death-certificates
const createDeathCertificate = async (req, res) => {
  try {
    const { informantDetails, deceasedDetails, documents, payment } = req.body;

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
      certificateType: 'death'
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
    
    const deathCertData = {
      token,
      informantDetails,
      deceasedDetails,
      documents,
      payment,
      status: 'pending',
      submittedAt: new Date()
    };

    const savedCert = addDeathCert(deathCertData);

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
    console.error('Create death cert error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting application'
    });
  }
};

// @desc Get death certificate by token/mobile
// @route GET /api/death-certificates/:tokenOrMobile
const getDeathCertificate = async (req, res) => {
  try {
    const { tokenOrMobile } = req.params;
    
    const deathCert = getDeathByTokenOrMobile(tokenOrMobile);

    if (!deathCert) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: deathCert
    });
  } catch (error) {
    console.error('Get death cert error:', error);
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

    const deathCert = getDeathById(id);
    if (!deathCert) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    deathCert.status = status;
    if (status === 'approved') {
      deathCert.approvedAt = new Date();
      deathCert.approvedBy = approvedBy;
    }

    updateDeathCert(id, { status, approvedAt: deathCert.approvedAt, approvedBy });

    res.json({
      success: true,
      data: deathCert
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllDeathCertificates = async (req, res) => {
  try {
    res.json({
      success: true,
      data: deathData.slice(),
      count: deathData.length
    });
  } catch (error) {
    console.error('Get all death certs error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching certificates' });
  }
};

module.exports = {
  createDeathCertificate,
  getDeathCertificate,
  updateStatus,
  getAllDeathCertificates
};
