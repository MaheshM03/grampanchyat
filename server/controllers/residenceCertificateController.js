// Import model
const ResidenceCertificate = require('../models/ResidenceCertificate');
const { verifyPayment } = require('./paymentController');

// Generate token
const generateToken = () => 'RC' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

// @desc Create new residence certificate application
exports.createResidenceCertificate = async (req, res) => {
  try {
    const { applicantDetails, residenceDetails, documents: docMetadata, payment } = req.body;
    const mobile = applicantDetails?.mobile || req.body.mobile;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required'
      });
    }

    // Validate Razorpay payment
    if (!payment || !payment.razorpay_payment_id || !payment.razorpay_order_id || !payment.razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Valid Razorpay payment details required'
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
        message: 'Payment verification failed'
      });
    }

    const token = generateToken();
    
    const residenceCertData = {
      token,
      mobile,
      applicantDetails: JSON.parse(applicantDetails),
      residenceDetails: JSON.parse(residenceDetails),
      documents: JSON.parse(docMetadata), // metadata for now
      payment: JSON.parse(payment),
      status: 'pending'
    };

    const savedCert = await ResidenceCertificate.create(residenceCertData);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        token,
        applicationId: savedCert._id,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Create residence cert error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc Get by token/mobile
exports.getResidenceCertificate = async (req, res) => {
  try {
    const { tokenOrMobile } = req.params;
    
    const residenceCert = await ResidenceCertificate.findOne({
      $or: [{ token: tokenOrMobile }, { mobile: tokenOrMobile }]
    }).lean();

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
      message: 'Server error'
    });
  }
};

// @desc Get all (admin)
exports.getAllResidenceCertificates = async (req, res) => {
  try {
    const certificates = await ResidenceCertificate.find({}).sort({ submittedAt: -1 }).lean();
    res.json({
      success: true,
      data: certificates,
      count: certificates.length
    });
  } catch (error) {
    console.error('Get all residence certs error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc Update status (admin)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approvedBy } = req.body;

    const updates = { status };
    if (status === 'approved') {
      updates.approvedAt = new Date();
      updates.approvedBy = approvedBy;
    }

    const residenceCert = await ResidenceCertificate.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).lean();

    if (!residenceCert) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({
      success: true,
      data: residenceCert
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
