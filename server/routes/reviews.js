const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const Book = require('../models/Book');

// Get reviews for a book
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Add a review
router.post('/', auth, async (req, res) => {
  try {
    const { bookId, rating, content, wouldRecommend } = req.body;
    
    // Check if user has already reviewed this book
    const existingReview = await Review.findOne({ book: bookId, user: req.userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      book: bookId,
      user: req.userId,
      rating,
      content,
      wouldRecommend
    });
    await review.save();

    // Update book's average rating
    const book = await Book.findById(bookId);
    if (book) {
      const reviews = await Review.find({ book: bookId });
      const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
      book.rating = avgRating;
      await book.save();
    }

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review' });
  }
});

// Get recent reviews
router.get('/recent', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name')
      .populate('book', 'title author coverImage')
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent reviews' });
  }
});

module.exports = router; 