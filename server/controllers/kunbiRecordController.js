// In-memory store - resets on server restart
let kunbiData = [];

// Helper functions
const kunbiGetAll = () => [...kunbiData];
const kunbiGetById = (_id) => kunbiData.find(record => record._id === _id);
const kunbiAddRecord = (recordData) => {
  const record = { ...recordData, _id: Date.now().toString(), createdAt: new Date() };
  kunbiData.unshift(record);
  return record;
};
const kunbiUpdateRecord = (_id, updates) => {
  const index = kunbiData.findIndex(record => record._id === _id);
  if (index > -1) {
    kunbiData[index] = { ...kunbiData[index], ...updates };
    return kunbiData[index];
  }
  return null;
};
const kunbiDeleteRecord = (_id) => {
  const index = kunbiData.findIndex(record => record._id === _id);
  if (index > -1) {
    kunbiData.splice(index, 1);
    return true;
  }
  return false;
};

// @desc    Get all kunbi records
// @route   GET /api/kunbi
const getKunbiRecords = async (req, res) => {
  try {
    const records = kunbiGetAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, count: records.length, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single kunbi record
// @route   GET /api/kunbi/:id
const getKunbiRecord = async (req, res) => {
  try {
    const record = kunbiGetById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create kunbi record
// @route   POST /api/kunbi
const createKunbiRecord = async (req, res) => {
  try {
    const savedRecord = kunbiAddRecord(req.body);
    res.status(201).json({ success: true, data: savedRecord });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update kunbi record
// @route   PUT /api/kunbi/:id
const updateKunbiRecord = async (req, res) => {
  try {
    const updated = kunbiUpdateRecord(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete kunbi record
// @route   DELETE /api/kunbi/:id
const deleteKunbiRecord = async (req, res) => {
  try {
    const deleted = kunbiDeleteRecord(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getKunbiRecords,
  getKunbiRecord,
  createKunbiRecord,
  updateKunbiRecord,
  deleteKunbiRecord
};
