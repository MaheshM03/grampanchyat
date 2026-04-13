// @desc Create new grievance/complaint/suggestion
const Grievance = require('../models/Grievance');

// @route POST /api/grievance
// @desc Submit new grievance form
const createGrievance = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      aadhaar,
      email,
      department,
      details,
      type,
      image
    } = req.body;

    // Basic manual validation (before Mongoose)
    if (!fullName?.trim() || !mobile || !aadhaar || !department?.trim() || !details?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mobile number (10 digits required)'
      });
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Aadhaar number (12 digits required)'
      });
    }

    // Create grievance data matching schema exactly
    const grievanceData = {
      fullName: fullName.trim(),
      mobile,
      aadhaar,
      email: email || '',
      department: department.trim(),
      details: details.trim(),
      type: type || 'complaint',
      image: image || ''
    };

    const grievance = new Grievance(grievanceData);
    await grievance.save();

    res.status(201).json({
      success: true,
      message: `Grievance submitted successfully. ID: ${grievance._id}`,
      data: grievance
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }
    console.error('Create grievance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc Update grievance status
// @route POST /api/grievance/:id/status
const updateGrievanceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'processed', 'resolved'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const grievance = await Grievance.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!grievance) {
      return res.status(404).json({ success: false, message: 'Grievance not found' });
    }

    res.json({
      success: true,
      message: 'Status updated',
      data: grievance
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc Get all grievances (admin/public)
const getGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      count: grievances.length,
      data: grievances
    });
  } catch (error) {
    console.error('Fetch grievances error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  createGrievance,
  getGrievances,
  updateGrievanceStatus
};
