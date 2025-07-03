const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const {
  getImage,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
} = require('../controllers/galleryControllers');

// ✅ Multer storage config (same as notification)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Folder must exist
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname); // e.g., 172016154123.jpg
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Gallery Routes with file upload
router.get('/list', getImage);                 // GET all images
router.get('/get/:id', getImageById);          // GET an image by ID
router.post('/create', upload.single('Image'), createImage);  // CREATE with image upload
router.put('/update/:id', upload.single('Image'), updateImage); // UPDATE with image upload
router.delete('/delete/:id', deleteImage);     // DELETE image

module.exports = router;
