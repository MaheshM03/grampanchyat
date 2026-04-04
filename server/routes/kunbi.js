const express = require('express');
const router = express.Router();
const {
  getKunbiRecords,
  getKunbiRecord,
  createKunbiRecord,
  updateKunbiRecord,
  deleteKunbiRecord
} = require('../controllers/kunbiRecordController');

// GET /api/kunbi - Get all kunbi records
router.get('/', getKunbiRecords);

// GET /api/kunbi/:id - Get single kunbi record
router.get('/:id', getKunbiRecord);

// POST /api/kunbi - Create kunbi record
router.post('/', createKunbiRecord);

// PUT /api/kunbi/:id - Update kunbi record
router.put('/:id', updateKunbiRecord);

// DELETE /api/kunbi/:id - Delete kunbi record
router.delete('/:id', deleteKunbiRecord);

module.exports = router;
