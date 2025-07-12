const { getDb } = require('../config/db'); // Updated import path

exports.getPublicProfiles = async (req, res) => {
  try {
    const db = getDb();
    const { skill, availability } = req.query;

    // Build query dynamically
    const query = { isPublic: true };

    if (skill) {
      query.$or = [
        { skillsOffered: { $regex: skill, $options: 'i' } },
        { skillsWanted: { $regex: skill, $options: 'i' } }
      ];
    }

    if (availability) {
      query.availability = { $in: [availability] };
    }

    const users = await db.collection('users')
      .find(query)
      .project({
        name: 1,
        profilePhoto: 1,
        location: 1,
        bio: 1,
        skillsOffered: 1,
        skillsWanted: 1,
        availability: 1,
        rating: 1
      })
      .toArray();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching public profiles:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
