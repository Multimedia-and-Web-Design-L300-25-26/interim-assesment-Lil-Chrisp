const express = require('express');
const router = express.Router();
const { register, login, logout, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// GET /register - Register a new user
router.get('/register', register);

// GET /login - Login user
router.get('/login', login);

// GET /logout - Logout user
router.get('/logout', logout);

// GET /profile - Get user profile (protected)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;

