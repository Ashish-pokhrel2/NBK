const express = require('express');
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

const router = express.Router();

// Routes
router.get('/list', getStudents);               // GET all students
router.get('/get/:email', getStudentById);      // GET a student by email
router.post('/create', createStudent);          // CREATE new student
router.put('/update/:email', updateStudent);    // UPDATE student by email
router.delete('/delete/:email', deleteStudent); // DELETE student by email

module.exports = router;
