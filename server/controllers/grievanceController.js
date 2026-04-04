// @desc Create new grievance/complaint/suggestion
const Grievance = require('../models/Grievance');

// In-memory handlers (no DB needed)
const grievances = []; // direct array like other controllers

// @route POST /api/grievance
// @desc Submit new grievance form
const createGrievance = async (req, res) => {
  try {
    const { firstName, middleName, lastName, mobile, aadhaar, email, department, details, type } = req.body;
    
    // Basic validation
    if (!firstName || !middleName || !lastName || !mobile || !department || !details) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: name, mobile, department, details' 
      });
    }
    
    const fullName = `${firstName} ${middleName} ${lastName}`.trim();
    const grievanceData = {
      fullName,
      mobile,
      aadhaar,
      email: email || '',
      department,
      details,
      type: type || 'complaint', // complaint/suggestion
      status: 'pending',
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    // Save (in-memory - matches other controllers)
    const saved = Grievance.create(grievanceData);
    grievances.unshift(saved); // newest first
    
    res.status(201).json({ 
      success: true, 
      message: 'Grievance submitted successfully. Token: ' + saved.id,
      data: saved 
    });
  } catch (error) {
    console.error('Create grievance error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Export for future admin endpoints
const getGrievances = async (req, res) => {
  try {
    res.json({ 
      success: true, 
      count: grievances.length, 
      data: grievances 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  createGrievance,
  getGrievances
};

