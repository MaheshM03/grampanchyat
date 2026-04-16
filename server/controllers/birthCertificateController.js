// Import model
const BirthCertificate = require('../models/BirthCertificate');
const { verifyPayment } = require('./paymentController');

// Generate token
const generateToken = () => 'BP' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

// @desc Create new birth certificate application
// @route POST /api/birth-certificates
exports.createBirthCertificate = async (req, res) => {
  try {
    const { mobile, childDetails, fatherDetails, motherDetails, documents: docMetadata, payment } = req.body;

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
      certificateType: 'birth'
    };
    const verifyResult = await verifyPayment({ body: verifyBody });
    if (!verifyResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    const token = generateToken();
    
    const birthCertData = {
      token,
      mobile,
      childDetails: JSON.parse(childDetails),
      fatherDetails: JSON.parse(fatherDetails),
      motherDetails: JSON.parse(motherDetails),
      address: req.body.address,
      documents: JSON.parse(docMetadata), // metadata for now
      payment: JSON.parse(payment),
      status: 'pending'
    };

    const savedCert = await BirthCertificate.create(birthCertData);

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
    console.error('Create birth cert error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc Get by token/mobile
exports.getBirthCertificate = async (req, res) => {
  try {
    const { tokenOrMobile } = req.params;
    
    const birthCert = await BirthCertificate.findOne({
      $or: [{ token: tokenOrMobile }, { mobile: tokenOrMobile }]
    }).lean();

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
      message: 'Server error'
    });
  }
};

// @desc Get all (admin)
exports.getAllBirthCertificates = async (req, res) => {
  try {
    const certificates = await BirthCertificate.find({}).sort({ submittedAt: -1 }).lean();
    res.json({
      success: true,
      data: certificates,
      count: certificates.length
    });
  } catch (error) {
    console.error('Get all birth certs error:', error);
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

    const birthCert = await BirthCertificate.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).lean();

    if (!birthCert) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({
      success: true,
      data: birthCert
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
