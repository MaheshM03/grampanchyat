// In-memory store - resets on server restart
let residenceData = [];

const generateToken = () => {
  return 'RC' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
};

// Helper functions
const getResidenceById = (id) => residenceData.find(cert => cert.id === id);
const getResidenceByTokenOrMobile = (tokenOrMobile) => {
  return residenceData.find(cert => cert.token === tokenOrMobile || cert.applicantDetails?.mobile === tokenOrMobile);
};
const addResidenceCert = (certData) => {
  const cert = { ...certData, id: Date.now().toString() };
  residenceData.unshift(cert);
  return cert;
};
const updateResidenceCert = (id, updates) => {
  const index = residenceData.findIndex(cert => cert.id === id);
  if (index > -1) {
    residenceData[index] = { ...residenceData[index], ...updates };
    return residenceData[index];
  }
  return null;
};

// Import payment verification
const { verifyPayment } = require('./paymentController');

// @desc Create new residence certificate application
// @route POST /api/residence-certificates
const createResidenceCertificate = async (req, res) => {
  try {
    const { applicantDetails, residenceDetails, documents, payment } = req.body;
    const mobile = applicantDetails?.mobile || req.body.mobile;

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
      certificateType: 'residence'
    };
    const verifyResult = await verifyPayment({ body: verifyBody });
    if (!verifyResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Please try again.'
      });
    }

    // Payment verified, proceed

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required'
      });
    }

    const token = generateToken();
    
    const residenceCertData = {
      token,
      mobile,
      applicantDetails,
      residenceDetails,
      documents,
      payment,
      status: 'pending',
      submittedAt: new Date()
    };

    const savedCert = addResidenceCert(residenceCertData);

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
    console.error('Create residence cert error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting application'
    });
  }
};

// @desc Get residence certificate by token/mobile
// @route GET /api/residence-certificates/:tokenOrMobile
const getResidenceCertificate = async (req, res) => {
  try {
    const { tokenOrMobile } = req.params;
    
    const residenceCert = getResidenceByTokenOrMobile(tokenOrMobile);

    if (!residenceCert) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: residenceCert
    });
  } catch (error) {
    console.error('Get residence cert error:', error);
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

    const residenceCert = getResidenceById(id);
    if (!residenceCert) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    residenceCert.status = status;
    if (status === 'approved') {
      residenceCert.approvedAt = new Date();
      residenceCert.approvedBy = approvedBy;
    }

    updateResidenceCert(id, { status, approvedAt: residenceCert.approvedAt, approvedBy });

    res.json({
      success: true,
      data: residenceCert
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllResidenceCertificates = async (req, res) => {
  try {
    res.json({
      success: true,
      data: residenceData.slice(),
      count: residenceData.length
    });
  } catch (error) {
    console.error('Get all residence certs error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching certificates' });
  }
};

module.exports = {
  createResidenceCertificate,
  getResidenceCertificate,
  updateStatus,
  getAllResidenceCertificates
};
