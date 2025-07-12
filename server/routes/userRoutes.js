const express = require('express');
const router = express.Router();
const {
  getAllPublicProfiles,
  getPaginatedPublicProfiles
} = require('../controllers/userController');

router.get('/public', getAllPublicProfiles);
router.get('/public-paginated', getPaginatedPublicProfiles);

module.exports = router;
