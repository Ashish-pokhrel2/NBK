const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// ================= STUDENT LOGIN =================
const studentLogin = async (req, res) => {
  try {
    console.log('🎓 STUDENT LOGIN ENDPOINT HIT 🎓');
    console.log('🔍 Login request received:');
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.headers['content-type']);
    
    const { registrationNo, password } = req.body;

    if (!registrationNo || !password) {
      console.log('❌ Missing fields - registrationNo:', !!registrationNo, 'password:', !!password);
      return res.status(400).json({
        success: false,
        message: 'Registration number and password are required'
      });
    }

    // Check if student exists by registration number (Number field)
    const [student] = await db.query(
      'SELECT * FROM student WHERE Number = ?',
      [registrationNo]
    );

    if (!student.length) {
      return res.status(401).json({
        success: false,
        message: 'Invalid registration number or password'
      });
    }

    const studentData = student[0];

    // Check if password starts with $2b (bcrypt hash)
    let passwordMatch = false;
    if (studentData.password.startsWith('$2b$')) {
      // Use bcrypt for hashed passwords
      passwordMatch = await bcrypt.compare(password, studentData.password);
    } else {
      // Plain text password comparison (for existing students)
      passwordMatch = (password === studentData.password);
    }

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid registration number or password'
      });
    }

    // Check if login access is enabled
    if (!studentData.loginAccess) {
      return res.status(403).json({
        success: false,
        message: 'Login access has been disabled for this account. Please contact the administrator.'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        email: studentData.Email,
        name: studentData.Name,
        registrationNo: studentData.Number
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...studentResponse } = studentData;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      student: studentResponse
    });

  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// ================= GET STUDENT PROFILE =================
const getStudentProfile = async (req, res) => {
  try {
    // Student info is already available in req.student from middleware
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      student: req.student
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// ================= STUDENT LOGOUT =================
const studentLogout = async (req, res) => {
  try {
    // For JWT, logout is handled on the client side by removing the token
    // Optionally, you can maintain a blacklist of tokens
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Student logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// ================= CHANGE PASSWORD =================
const changePassword = async (req, res) => {
  try {
    console.log('🔐 STUDENT CHANGE PASSWORD ENDPOINT HIT 🔐');
    console.log('Request body:', req.body);
    
    const { currentPassword, newPassword } = req.body;
    const studentEmail = req.student.Email; // From authentication middleware (uppercase E)

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get current student data
    const [student] = await db.query(
      'SELECT * FROM student WHERE Email = ?',
      [studentEmail]
    );

    if (!student.length) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const studentData = student[0];

    // Verify current password
    let currentPasswordMatch = false;
    if (studentData.password.startsWith('$2b$')) {
      // Use bcrypt for hashed passwords
      currentPasswordMatch = await bcrypt.compare(currentPassword, studentData.password);
    } else {
      // Plain text password comparison (for existing students)
      currentPasswordMatch = (currentPassword === studentData.password);
    }

    if (!currentPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await db.query(
      'UPDATE student SET password = ? WHERE Email = ?',
      [hashedNewPassword, studentEmail]
    );

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  studentLogin,
  getStudentProfile,
  studentLogout,
  changePassword
};
