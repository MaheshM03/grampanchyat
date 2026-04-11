const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    mobile: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, 'Please use a valid 10-digit mobile number']
    },

    aadhaar: {
      type: String,
      required: true,
      match: [/^[0-9]{12}$/, 'Please use a valid 12-digit Aadhaar number']
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
    },

    department: {
      type: String,
      required: true
    },

    details: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ['complaint', 'suggestion'],
      default: 'complaint'
    },

    status: {
      type: String,
      enum: ['pending', 'processed', 'resolved'],
      default: 'pending'
    },

    image: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Grievance', grievanceSchema);