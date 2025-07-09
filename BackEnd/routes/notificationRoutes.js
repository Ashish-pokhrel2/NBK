const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { authenticateStudent } = require('../middleware/auth');

const {
  notification,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead,
  getNotificationsForStudent,
} = require('../controllers/notificationControllers');

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Ensure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname); // e.g. 171912378123.pdf
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ Notification Routes
router.get('/list', notification); // Admin route - no auth needed
router.get('/student-notifications', authenticateStudent, getNotificationsForStudent); // Student route - auth required
router.get('/get/:id', getNotificationById);
router.post('/create', upload.single('Attachment'), createNotification);
router.put('/update/:id', upload.single('Attachment'), updateNotification);
router.put('/mark-read/:id', authenticateStudent, markAsRead); // Student route - auth required
router.delete('/delete/:id', deleteNotification);

module.exports = router;
