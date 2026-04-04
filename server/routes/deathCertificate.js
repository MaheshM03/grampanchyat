const express = require('express');
const router = express.Router();
const {
  createDeathCertificate,
  getDeathCertificate,
  updateStatus,
  getAllDeathCertificates
} = require('../controllers/deathCertificateController');

// @desc Submit new death certificate application
// @route POST /api/death-certificates
router.post('/', createDeathCertificate);

// @desc Get all death certificates (admin)
// @route GET /api/death-certificates
router.get('/', getAllDeathCertificates);

// @desc Get death certificate status by token or mobile
// @route GET /api/death-certificates/:tokenOrMobile
router.get('/:tokenOrMobile', getDeathCertificate);

// @desc Admin - Update application status
// @route PUT /api/death-certificates/:id/status
router.put('/:id/status', updateStatus);

module.exports = router;
