const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const mySqlPool = require('./config/db');
const path = require('path');

// configure dotenv
dotenv.config();

const app = express();

// ✅ Serve uploads folder as static (important for attachments)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ CORS Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Add middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`📋 ${req.method} ${req.url} - Body:`, JSON.stringify(req.body));
  next();
});

// Routes
console.log('Registering routes...');
app.use('/api/v1/student', require('./routes/studentsRoutes'));
console.log('✅ Student routes registered at /api/v1/student');
app.use('/api/v1/auth', require('./routes/studentAuthRoutes'));
console.log('✅ Student auth routes registered at /api/v1/auth');
app.use('/api/v1/gallery', require('./routes/galleryRoutes'));
app.use('/api/v1/faculty', require('./routes/facultyRoutes'));
app.use('/api/v1/messages', require('./routes/messagesRoutes'));
app.use('/api/v1/notice', require('./routes/notificationRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
console.log('✅ Admin routes registered at /api/v1/admin');

app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

const PORT = process.env.PORT || 8000;

// Check MySQL connection and then start the server
mySqlPool.query('SELECT 1')
  .then(() => {
    console.log('Database connection successful'.bgGreen.white);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`.bgMagenta.white);
    });
  })
  .catch((error) => {
    console.log(error);
  });
