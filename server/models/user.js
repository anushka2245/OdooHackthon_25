const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // hashed
  profilePhoto: String,
  location: String,
  isPublic: { type: Boolean, default: true },
  skillsOffered: [String],
  skillsWanted: [String],
  availability: [String], // e.g., ["Weekends", "Evenings"]
  rating: { type: Number, default: 0 },
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
});

module.exports = mongoose.model('User', userSchema);