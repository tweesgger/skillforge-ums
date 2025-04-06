const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected Route
router.get('/me', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome, authenticated user!', user: req.user });
});

// Admin-Only Route
router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;

