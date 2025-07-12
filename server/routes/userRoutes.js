const express = require('express');
const router = express.Router();

const {
  getPublicProfiles,
  getPaginatedPublicProfiles,
  getUserById,
  updateUserById
} = require('../controllers/userController');

// Get all public user profiles
router.get('/public-profiles', getPublicProfiles);

// Get paginated public profiles
router.get('/public-paginated', getPaginatedPublicProfiles);

// Get single user by ID
router.get('/:id', getUserById);

router.put('/:id', updateUserById);

module.exports = router;
