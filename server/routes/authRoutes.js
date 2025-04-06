const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');

console.log('in authRoute now');

// Public Routes
// Registration route
router.post('/register', validateRegister, authController.register);
// Login route
router.post('/login', validateLogin, authController.login);

// Protected Route
router.get('/me', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome, authenticated user!', user: req.user });
});

// Admin-Only Route
router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

console.log('Leaving authRoute now');

module.exports = router;

