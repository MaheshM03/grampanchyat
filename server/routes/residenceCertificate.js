const express = require('express');
const router = express.Router();
const {
  createResidenceCertificate,
  getResidenceCertificate,
  updateStatus,
  getAllResidenceCertificates
} = require('../controllers/residenceCertificateController');

// @desc Submit new residence certificate application
// @route POST /api/residence-certificates
router.post('/', createResidenceCertificate);

// @desc Get all residence certificates (admin)
// @route GET /api/residence-certificates
router.get('/', getAllResidenceCertificates);

// @desc Get residence certificate status by token or mobile
// @route GET /api/residence-certificates/:tokenOrMobile
router.get('/:tokenOrMobile', getResidenceCertificate);

// @desc Admin - Update application status
// @route PUT /api/residence-certificates/:id/status
router.put('/:id/status', updateStatus);

module.exports = router;

