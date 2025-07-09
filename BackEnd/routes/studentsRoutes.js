const express = require('express');
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  toggleLoginAccess,
  resetPassword
} = require('../controllers/studentController');

const router = express.Router();

// Routes
router.get('/list', getStudents);               // GET all students
router.get('/get/:email', getStudentById);      // GET a student by email
router.post('/create', createStudent);          // CREATE new student
router.put('/update/:email', updateStudent);    // UPDATE student by email
router.put('/toggle-login/:email', toggleLoginAccess); // TOGGLE login access
router.put('/reset-password/:email', resetPassword);   // RESET password
router.delete('/delete/:email', deleteStudent); // DELETE student by email

module.exports = router;
