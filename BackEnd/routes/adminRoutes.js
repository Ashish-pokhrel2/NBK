const express = require('express');
const router = express.Router();

// Hardcoded admin credentials (for now)
const ADMIN_EMAIL = 'aashish.pokhrel.12122@gmail.com';
const ADMIN_PASSWORD = 'admin';

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, message: 'Admin login successful' });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

module.exports = router; 
