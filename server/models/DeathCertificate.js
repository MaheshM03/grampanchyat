const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  originalname: {
    type: String,
    required: true
  },
  filename: String,
  path: {
    type: String,
    required: true
  },
  size: Number,
  mimetype: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const DeathCertificateSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  informantDetails: Schema.Types.Mixed,
  deceasedDetails: Schema.Types.Mixed,
  documents: [DocumentSchema],
  payment: {
    razorpay_payment_id: String,
    razorpay_order_id: String,
    razorpay_signature: String,
    amount: Number,
    method: String,
    verified: Boolean
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  approvedAt: Date,
  approvedBy: String
}, {
  timestamps: true
});

module.exports = mongoose.model('DeathCertificate', DeathCertificateSchema);
