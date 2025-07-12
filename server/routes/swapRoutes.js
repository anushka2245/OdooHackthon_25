const express = require('express');
const {
  sendSwapRequest,
  getUserSwapRequests,
  updateSwapRequestStatus,
  deleteSwapRequest,
} = require('../controllers/swapController');

// 👇 REMOVE THIS LINE IF NOT USING TOKEN AUTH
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ⚠️ Remove `protect` if you don’t want token validation
router.post('/', sendSwapRequest);
router.get('/', getUserSwapRequests);
router.put('/:id', updateSwapRequestStatus);
router.delete('/:id', deleteSwapRequest);

module.exports = router;
