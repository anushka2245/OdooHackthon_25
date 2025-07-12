const express = require('express');
const router = express.Router();
const {
  getPublicProfiles,                // ✅ Corrected name
  getPaginatedPublicProfiles,
  getUserById,
  updateUserById
} = require('../controllers/userController');

router.get('/public-profiles', getPublicProfiles);           
router.get('/public-paginated', getPaginatedPublicProfiles);
router.get('/:id', getUserById);
router.put('/:id', updateUserById); 



module.exports = router;
