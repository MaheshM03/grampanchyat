const express = require('express');
const router = express.Router();
const { getAllDocuments } = require('../controllers/adminController');

// @route GET /api/admin/certificates
// @desc Get all certificate documents (admin only)
router.get('/certificates', getAllDocuments);

module.exports = router;

