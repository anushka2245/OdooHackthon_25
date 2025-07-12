const express = require('express');
const router = express.Router();
const { getPublicProfiles } = require('../controllers/userController');

// GET public user profiles
router.get('/public-profiles', getPublicProfiles);

module.exports = router;
