const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require("body-parser");
const authRoutes = require('./routes/auth');
const userRoute = require('./routes/user');
const userRoutes = require("./routes/userRoutes");
const searchRoutes = require('./routes/search');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/payment');
const multer = require('multer');
const path =require('path');

// Initialize express app
const app = express();
app.use(bodyParser.json());

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend requests
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/payment', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api', searchRoutes);
app.use('/api/admin', adminRoutes);
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});



// Basic route for testing
app.get('/', (req, res) => {
  res.send('Matrimonial Website API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});