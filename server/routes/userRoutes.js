const express = require('express');
const router = express.Router();
const {
  getPublicProfiles,                // ✅ Corrected name
  getPaginatedPublicProfiles
} = require('../controllers/userController');

router.get('/public-profiles', getPublicProfiles);           // ✅ Matches export
router.get('/public-paginated', getPaginatedPublicProfiles);

module.exports = router;
