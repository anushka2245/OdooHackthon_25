const SwapRequest = require('../models/SwapRequest');

// Send a New Swap Request
exports.sendSwapRequest = async (req, res) => {
  const { fromUser, toUser, skillOffered, skillRequested } = req.body;

  try {
    const swap = await SwapRequest.create({
      fromUser,
      toUser
    });

    res.status(201).json(swap);
  } catch (error) {
    console.error("Send Swap Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Swap Requests for Specific User
exports.getUserSwapRequests = async (req, res) => {
  const { userId } = req.query;

  try {
    const swaps = await SwapRequest.find({
      $or: [
        { fromUser: userId },
        { toUser: userId }
      ]
    })
      .populate('fromUser', 'firstName lastName email')
      .populate('toUser', 'firstName lastName email');

    res.json(swaps);
  } catch (error) {
    console.error("Fetch Swaps Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSwapRequestsGroupedByStatus = async (req, res) => {
  try {
    // Find all swap requests without filtering by userId
    const allRequests = await SwapRequest.find()
      .populate('fromUser', 'firstName lastName email')
      .populate('toUser', 'firstName lastName email');

    const pending = [];
    const accepted = [];
    const rejected = [];

    allRequests.forEach((swap) => {
      if (swap.status === 'pending') pending.push(swap);
      else if (swap.status === 'accepted') accepted.push(swap);
      else if (swap.status === 'rejected') rejected.push(swap);
    });

    res.json({
      success: true,
      pending,
      accepted,
      rejected,
    });
  } catch (error) {
    console.error("Fetch Swaps Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//  Update Swap Request Status (Accept/Reject)
exports.updateSwapRequestStatus = async (req, res) => {
  const { status, userId } = req.body;

  try {
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (swap.toUser.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this request' });
    }

    swap.status = status;
    await swap.save();

    res.json(swap);
  } catch (error) {
    console.error("Update Swap Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a Swap Request (only fromUser can delete)
exports.deleteSwapRequest = async (req, res) => {
  const { userId } = req.body;

  try {
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (swap.fromUser.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this request' });
    }

    await swap.deleteOne();
    res.json({ message: 'Swap request deleted successfully' });
  } catch (error) {
    console.error("Delete Swap Error:", error);
    res.status(500).json({ message: error.message });
  }
};
