const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ✅ Register New User
const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    location,
    bio,
    profilePhoto,
    skillsOffered,
    skillsWanted,
    timezone,
    preferredTime,
    isPublic,
    receiveNotifications,
    acceptedTerms
  } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      location,
      bio,
      profilePhoto,
      skillsOffered,
      skillsWanted,
      timezone,
      preferredTime,
      isPublic,
      receiveNotifications,
      acceptedTerms
    });

    // Return response with token
    res.status(201).json({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
