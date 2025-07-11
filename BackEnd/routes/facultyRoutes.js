const express = require('express');
const multer = require('multer');
const path = require('path');
const {
    faculty,
    getFacultyByEmail,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getFacultyByHierarchy,
    getAllHierarchies,
    getAllFacultyGrouped,
    uploadFacultyImage
} = require('../controllers/facultyControllers');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Folder must exist
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname); // e.g., 172016154123.jpg
        cb(null, uniqueName);
    },
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Routes
router.get('/list', faculty);                // GET all faculty members
router.get('/get/:CollegeEmail', getFacultyByEmail); // GET a faculty member by email
router.get('/hierarchy/:hierarchy', getFacultyByHierarchy); // GET faculty by hierarchy
router.get('/hierarchies', getAllHierarchies); // GET all hierarchies
router.get('/grouped', getAllFacultyGrouped); // GET all faculty grouped by hierarchy
router.post('/create', createFaculty);          // CREATE a new faculty member
router.put('/update/:CollegeEmail', updateFaculty); // UPDATE a faculty member by email
router.delete('/delete/:CollegeEmail', deleteFaculty); // DELETE a faculty member by email
router.post('/upload-image/:CollegeEmail', upload.single('image'), uploadFacultyImage); // Upload faculty image

module.exports = router;