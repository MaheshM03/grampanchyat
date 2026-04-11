// @desc Create new grievance/complaint/suggestion
const Grievance = require('../models/Grievance');

// @route POST /api/grievance
// @desc Submit new grievance form
const createGrievance = async (req, res) => {
  try {
    // Proper destructuring (removed \n and fixed naming)
    const {
      firstName,
      mobile,
      department,
      complaint,
      image,
      email,
      aadhaar,
      type
    } = req.body;

    // Rename fields properly
    const fullName = firstName;
    const details = complaint;

    // Basic validation
    if (!fullName || !mobile || !department || !details) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, mobile, department, complaint'
      });
    }

    // Create grievance object
    const grievanceData = {
      fullName,
      mobile,
      aadhaar: aadhaar || '',
      email: email || '',
      department,
      details,
      image: image || '',
      type: type || 'complaint', // complaint/suggestion
      status: 'pending',
      id: Date.now().toString(),
      createdAt: new Date()
    };

    const saved = await new Grievance(grievanceData).save();

    res.status(201).json({
      success: true,
      message: `Grievance submitted successfully. Token: ${saved.id}`,
      data: saved
    });

  } catch (error) {
    console.error('Create grievance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc Get all grievances
const getGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: grievances.length,
      data: grievances
    });

  } catch (error) {
    console.error('Fetch grievance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  createGrievance,
  getGrievances
};