const express = require('express');
const router = express.Router();
const {
  createGrievance,
  getGrievances
} = require('../controllers/grievanceController');

// @desc Submit new grievance/complaint/suggestion
// @route POST /api/grievance
router.post('/', createGrievance);

// @desc Get all grievances (admin)
// @route GET /api/grievance
router.get('/', getGrievances);

module.exports = router;

