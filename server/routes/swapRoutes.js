const express = require('express');
const {
  sendSwapRequest,
  getUserSwapRequests,
  updateSwapRequestStatus,
  deleteSwapRequest,
  getAllSwapRequestsGroupedByStatus
} = require('../controllers/swapController');

// 👇 REMOVE THIS LINE IF NOT USING TOKEN AUTH
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', sendSwapRequest);
router.get('/', getUserSwapRequests);
router.put('/:id', updateSwapRequestStatus);
router.delete('/:id', deleteSwapRequest);
router.get('/all-grouped', getAllSwapRequestsGroupedByStatus);


module.exports = router;
