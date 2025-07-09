const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()


const ADMIN_EMAIL = 'aashish.pokhrel.12122@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET; // Store this securely in .env in real apps

router.post('/login', (req, res) => {
  console.log('� ADMIN LOGIN ENDPOINT HIT 🚨');
  console.log('�🔍 Admin login request received:', req.body);
  
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Create JWT payload
    const payload = {
      email,
      role: 'admin',
    };

    // Sign token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1m'});

    return res.json({ success: true, token, message: 'Admin login successful' });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

module.exports = router;
