const express = require('express');
const router = express.Router();
const {
  createBirthCertificate,
  getBirthCertificate,
  updateStatus,
  getAllBirthCertificates
} = require('../controllers/birthCertificateController');

// @desc Submit new birth certificate application
// @route POST /api/birth-certificates
router.post('/', createBirthCertificate);

// @desc Get all birth certificates (admin)
// @route GET /api/birth-certificates
router.get('/', getAllBirthCertificates);

// @desc Get birth certificate status by token or mobile
// @route GET /api/birth-certificates/:tokenOrMobile
router.get('/:tokenOrMobile', getBirthCertificate);

// @desc Admin - Update application status
// @route PUT /api/birth-certificates/:id/status
router.put('/:id/status', updateStatus);

module.exports = router;
