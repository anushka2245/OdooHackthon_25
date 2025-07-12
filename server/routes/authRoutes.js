const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController');

// 👤 User Registration Route
router.post('/register', registerUser);

// 🔐 User Login Route
router.post('/login', loginUser);

module.exports = router;