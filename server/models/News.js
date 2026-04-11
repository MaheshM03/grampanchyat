const mongoose = require('mongoose');

// Dummy model - controllers already in-memory
module.exports = require('./DummyModel.js');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['News', 'Public Work', 'Development works', 'Antharman', 'Festival']
  },
  date: {
    type: Date,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  hasImage: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);
