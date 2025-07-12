const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    default: '',
  },

  bio: {
    type: String,
    default: '',
  },

  profilePhoto: {
    type: String,
    default: '',
  },

  skillsOffered: {
    type: [String],
    default: [],
  },

  skillsWanted: {
    type: [String],
    default: [],
  },

  timezone: {
    type: String,
    default: '',
  },

  preferredTime: {
    type: String,
    default: '',
  },

  isPublic: {
    type: Boolean,
    default: true,
  },

  receiveNotifications: {
    type: Boolean,
    default: true,
  },

  acceptedTerms: {
    type: Boolean,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  isBanned: {
    type: Boolean,
    default: false,
  }

}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
