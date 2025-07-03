const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const {
  notification,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
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
router.get('/list', notification);
router.get('/get/:id', getNotificationById);
router.post('/create', upload.single('Attachment'), createNotification);
router.put('/update/:id', upload.single('Attachment'), updateNotification);
router.delete('/delete/:id', deleteNotification);

module.exports = router;
