// Import model
const DeathCertificate = require('../models/DeathCertificate');
const { verifyPayment } = require('./paymentController');

// Generate token
const generateToken = () => 'DC' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

// @desc Create new death certificate application
exports.createDeathCertificate = async (req, res) => {
  try {
    const { informantDetails, deceasedDetails, documents: docMetadata, payment } = req.body;

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
      certificateType: 'death'
    };
    const verifyResult = await verifyPayment({ body: verifyBody });
    if (!verifyResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    const token = generateToken();
    
    const deathCertData = {
      token,
      informantDetails: JSON.parse(informantDetails),
      deceasedDetails: JSON.parse(deceasedDetails),
      documents: JSON.parse(docMetadata), // metadata for now
      payment: JSON.parse(payment),
      status: 'pending'
    };

    const savedCert = await DeathCertificate.create(deathCertData);

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
    console.error('Create death cert error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc Get by token/mobile
exports.getDeathCertificate = async (req, res) => {
  try {
    const { tokenOrMobile } = req.params;
    
    const deathCert = await DeathCertificate.findOne({
      $or: [{ token: tokenOrMobile }, {'informantDetails.mobile': tokenOrMobile }]
    }).lean();

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
      message: 'Server error'
    });
  }
};

// @desc Get all (admin)
exports.getAllDeathCertificates = async (req, res) => {
  try {
    const certificates = await DeathCertificate.find({}).sort({ submittedAt: -1 }).lean();
    res.json({
      success: true,
      data: certificates,
      count: certificates.length
    });
  } catch (error) {
    console.error('Get all death certs error:', error);
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

    const deathCert = await DeathCertificate.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).lean();

    if (!deathCert) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({
      success: true,
      data: deathCert
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
