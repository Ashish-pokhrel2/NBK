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
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/student', require('./routes/studentsRoutes'));
app.use('/api/v1/gallery', require('./routes/galleryRoutes'));
app.use('/api/v1/faculty', require('./routes/facultyRoutes'));
app.use('/api/v1/messages', require('./routes/messagesRoutes'));
app.use('/api/v1/notice', require('./routes/notificationRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

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
