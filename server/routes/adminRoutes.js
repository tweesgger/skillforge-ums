const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const { validateRoleUpdate } = require('../middleware/validationMiddleware');

console.log('using adminRoutes');
// All routes here are protected and admin-only
router.use(authenticateToken);
router.use(authorizeRoles('admin'));

router.get('/users', adminController.getAllUsers);
// Update user role route
router.put('/users/:id/role', validateRoleUpdate, adminController.updateUserRole);
router.delete('/users/:id', adminController.deleteUser);

console.log('done with adminRoutes');

module.exports = router;
