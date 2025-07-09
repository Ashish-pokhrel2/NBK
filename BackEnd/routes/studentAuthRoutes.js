const express = require('express');
const router = express.Router();
const { authenticateStudent } = require('../middleware/auth');
const {
  studentLogin,
  getStudentProfile,
  studentLogout,
  changePassword
} = require('../controllers/studentAuthController');

// Public routes
router.post('/login', studentLogin);

// Protected routes (require authentication)
router.use(authenticateStudent); // Apply authentication middleware to all routes below
router.get('/profile', getStudentProfile);
router.put('/change-password', changePassword);
router.post('/logout', studentLogout);

module.exports = router;
