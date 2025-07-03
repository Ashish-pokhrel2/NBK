const express = require('express');
const {
    faculty,
    getFacultyByEmail,
    createFaculty,
    updateFaculty,
    deleteFaculty
} = require('../controllers/facultyControllers');

const router = express.Router();

// Routes
router.get('/list', faculty);                // GET all faculty members
router.get('/get/:CollegeEmail', getFacultyByEmail); // GET a faculty member by email
router.post('/create', createFaculty);          // CREATE a new faculty member
router.put('/update/:CollegeEmail', updateFaculty); // UPDATE a faculty member by email
router.delete('/delete/:CollegeEmail', deleteFaculty); // DELETE a faculty member by email
module.exports = router;