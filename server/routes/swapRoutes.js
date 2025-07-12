const express = require('express');
const {
  sendSwapRequest,
  getUserSwapRequests,
  updateSwapRequestStatus,
  deleteSwapRequest,
  getAllSwapRequestsGroupedByStatus,
  getRequestsByFromUser
} = require('../controllers/swapController');

const router = express.Router();

// 👇 Specific GET routes first!
router.get('/all-grouped', getAllSwapRequestsGroupedByStatus);
router.get('/from/:id', getRequestsByFromUser);
router.get('/', getUserSwapRequests);

router.post('/', sendSwapRequest);
router.put('/:id', updateSwapRequestStatus);
router.delete('/:id', deleteSwapRequest);

module.exports = router;
