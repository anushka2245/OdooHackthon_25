const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); 

const {
  getPublicProfiles,
  getPaginatedPublicProfiles,
  getUserById,
  updateUserById
} = require('../controllers/userController');

// ✅ Get all public user profiles
router.get('/public-profiles', getPublicProfiles);

// ✅ Get paginated public profiles (e.g., ?page=1&limit=10)
router.get('/public-paginated', getPaginatedPublicProfiles);

// ✅ Get single user by ID
router.get('/:id', getUserById);

// ✅ Update user profile by ID, including optional profile photo upload
router.put('/:id', upload.single('profilePhoto'), updateUserById);

module.exports = router;
