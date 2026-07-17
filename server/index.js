require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const driverRoutes = require('./src/routes/driverRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const contactRoutes = require('./src/routes/contactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Middleware (Optimized for Serverless / Vercel)
const connectDB = async (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }
  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ success: false, message: 'FATAL ERROR: MONGODB_URI environment variable is missing on the server.' });
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000 // Fails in 3s instead of 10s if IP is blocked
    });
    console.log('MongoDB Connected');
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    return res.status(500).json({ success: false, message: 'Database Connection Failed. Check your MongoDB Atlas Network Access (IP Whitelist).', error: err.message });
  }
};

// Apply DB connection middleware to API routes
app.use('/api', connectDB);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', driverRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('Cab Sharing API is running...');
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
