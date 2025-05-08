const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book');

// Get user's books
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.userId })
      .sort({ addedAt: -1 });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Add a book
router.post('/', auth, async (req, res) => {
  try {
    const { title, author, coverImage, description, googleBooksId } = req.body;

    // Check if book already exists in user's bookshelf
    const existingBook = await Book.findOne({
      user: req.userId,
      googleBooksId
    });

    if (existingBook) {
      return res.status(400).json({ message: 'Book already in your bookshelf' });
    }

    const book = new Book({
      title,
      author,
      coverImage,
      description,
      googleBooksId,
      user: req.userId,
      status: 'want_to_read'
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Error adding book' });
  }
});

// Update book status
router.patch('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.userId });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    Object.assign(book, req.body);
    if (req.body.status === 'finished') {
      book.finishedAt = new Date();
    }
    await book.save();
    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Error updating book' });
  }
});

// Delete book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error deleting book' });
  }
});

// Get trending books
router.get('/trending', async (req, res) => {
  try {
    const trendingBooks = await Book.aggregate([
      { $group: { _id: '$title', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json(trendingBooks);
  } catch (error) {
    console.error('Error fetching trending books:', error);
    res.status(500).json({ message: 'Error fetching trending books' });
  }
});

module.exports = router; 