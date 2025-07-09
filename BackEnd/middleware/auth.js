const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Middleware to verify student JWT token
const authenticateStudent = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if student exists
    const [student] = await db.query(
      'SELECT Email, Name, Faculty, Year, Number FROM student WHERE Email = ?',
      [decoded.email]
    );

    if (!student.length) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Student not found.'
      });
    }

    // Add student info to request object with consistent field names
    const studentData = student[0];
    req.student = {
      ...studentData,
      registrationNo: studentData.Number // Add consistent field name
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token.',
      error: error.message
    });
  }
};

module.exports = { authenticateStudent };
