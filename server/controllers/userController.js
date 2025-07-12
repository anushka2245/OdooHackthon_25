const User = require('../models/user'); 

// GET /api/users/public
exports.getPublicProfiles = async (req, res) => {
  try {
    const { skill, availability } = req.query;

    const query = { isPublic: true };

    if (skill) {
      query.$or = [
        { skillsOffered: { $regex: skill, $options: 'i' } },
        { skillsWanted: { $regex: skill, $options: 'i' } },
      ];
    }

    if (availability) {
      query.availability = { $in: [availability] };
    }

    const users = await User.find(query)
      .select('name email profilePhoto location skillsOffered skillsWanted availability rating')
      .lean();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching public profiles:', error.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// GET /api/users/public-paginated
exports.getPaginatedPublicProfiles = async (req, res) => {
  try {
    const {
      skill,
      availability,
      page = 1,
      limit = 10,
      search = ''
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const searchQuery = search.trim();

    const query = { isPublic: true };

    if (skill) {
      query.$or = [
        { skillsOffered: { $regex: skill, $options: 'i' } },
        { skillsWanted: { $regex: skill, $options: 'i' } },
      ];
    }

    if (availability) {
      query.availability = { $in: [availability] };
    }

    if (searchQuery) {
      const searchFilter = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { location: { $regex: searchQuery, $options: 'i' } },
          { skillsOffered: { $regex: searchQuery, $options: 'i' } },
          { skillsWanted: { $regex: searchQuery, $options: 'i' } },
        ]
      };

      if (query.$or) {
        query.$and = [{ $or: query.$or }, searchFilter];
        delete query.$or;
      } else {
        Object.assign(query, searchFilter);
      }
    }

    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .select('name email profilePhoto location skillsOffered skillsWanted availability rating')
      .sort({ rating: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .lean();

    res.status(200).json({
      success: true,
      total,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      currentCount: users.length,
      searchQuery,
      data: users
    });
  } catch (error) {
    console.error('Error fetching paginated profiles:', error.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};


// GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

  
    const user = await User.findById(userId)
      .select('name email profilePhoto location skillsOffered skillsWanted availability rating')
      .lean();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};


// PUT /api/users/:id
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // 📸 If file is uploaded, set profilePhoto
    const profilePhoto = req.file ? `/uploads/${req.file.filename}` : req.body.profilePhoto;

    const {
      name,
      email,
      location,
      skillsOffered,
      skillsWanted,
      availability,
      rating,
      isPublic
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        profilePhoto, 
        location,
        skillsOffered,
        skillsWanted,
        availability,
        rating,
        isPublic
      },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};
