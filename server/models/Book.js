const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  coverImage: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  googleBooksId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['reading', 'finished', 'want_to_read'],
    default: 'want_to_read'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  finishedAt: {
    type: Date
  }
});

// Compound index for user and googleBooksId
bookSchema.index({ user: 1, googleBooksId: 1 }, { unique: true });

module.exports = mongoose.model('Book', bookSchema); 