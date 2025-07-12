const express = require('express');
const router = express.Router();
const { getPublicProfiles } = require('../controllers/userController');

// GET: Public user profiles (with optional query params like ?skill=...&availability=...)
router.get('/public-profiles', getPublicProfiles);

module.exports = router;
