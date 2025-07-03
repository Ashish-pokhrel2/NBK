const express = require('express');
const {
    getImage,
    getImageById,
    createImage,
    updateImage,
    deleteImage
} = require('../controllers/galleryControllers');

const router = express.Router();

// Routes
router.get('/list', getImage);                // GET all images
router.get('/get/:id', getImageById);         // GET an image by ID
router.post('/create', createImage);          // CREATE a new image
router.put('/update/:id', updateImage);       // UPDATE an image by ID
router.delete('/delete/:id', deleteImage);   // DELETE an image by ID
module.exports = router;