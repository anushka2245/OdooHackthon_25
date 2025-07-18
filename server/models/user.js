const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, 
  profilePhoto: {
    data: String,     
    contentType: String, 
  },
  location: String,
  isPublic: { type: Boolean, default: true },
  skillsOffered: [String],
  skillsWanted: [String],
  availability: [String], 
  rating: { type: Number, default: 0 },
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
});


module.exports = mongoose.model('User', userSchema);