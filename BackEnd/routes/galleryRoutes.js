const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

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
router.get('/download/:filename', (req, res) => {  // DOWNLOAD image with proper headers
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    // Check if file exists
    if (!require('fs').existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Set headers to force download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-cache');
    
    // Send file
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ error: 'Download failed' });
      }
    });
  } catch (error) {
    console.error('Download route error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
router.post('/create', upload.single('Image'), createImage);  // CREATE with image upload
router.put('/update/:id', upload.single('Image'), updateImage); // UPDATE with image upload
router.delete('/delete/:id', deleteImage);     // DELETE image

module.exports = router;
