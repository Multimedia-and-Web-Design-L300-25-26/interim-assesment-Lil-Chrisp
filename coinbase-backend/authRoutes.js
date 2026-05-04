const express = require('express');
const router = express.Router();
const { register, login, logout, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// POST /register - Register a new user
router.post('/register', register);

// POST /login - Login user
router.post('/login', login);

// GET /logout - Logout user
router.get('/logout', logout);

// GET /profile - Get user profile (protected)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;

