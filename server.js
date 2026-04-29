
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const cryptoRoutes = require('./routes/cryptoRoutes');
const seedDatabase = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// CORS configuration — allow Netlify frontend + local dev
const allowedOrigins = [
  '*',
  'https://lil-chrisp-crypto-app.netlify.app',
  'https://relaxed-centaur-f1a3ce.netlify.app',
  'https://*.netlify.app',
  'http://localhost:5000',
  'http://localhost:3000'
];

app.use(cors({
  origin: true,  // Allow all origins for Netlify + local
  credentials: true
}));

// Health check route for Render
app.get('/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected';
  let cryptoCount = 0;
  try {
    const Crypto = require('./models/Crypto');
    cryptoCount = await Crypto.countDocuments();
  } catch (e) {
    cryptoCount = -1;
  }
  res.status(200).json({
    success: true,
    status: 'ok',
    database: dbStatus,
    cryptoCount: cryptoCount,
    timestamp: new Date().toISOString()
  });
});

// API Routes (must be before static files to avoid conflicts with public folders)
app.use('/', authRoutes);
app.use('/crypto', cryptoRoutes);

// Static files (frontend) - after API routes so API endpoints take priority
app.use(express.static(path.join(__dirname, 'public')));

// Serve frontend pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// Validate required env vars
if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI environment variable is not set!');
  console.error('Please set MONGO_URI in your Render Environment Variables.');
}
if (!process.env.JWT_SECRET) {
  console.error('WARNING: JWT_SECRET environment variable is not set!');
  console.error('Please set JWT_SECRET in your Render Environment Variables.');
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('MongoDB connected successfully');
    // Seed database with initial crypto data if empty
    seedDatabase();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error('Make sure MONGO_URI is set correctly in environment variables.');
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

