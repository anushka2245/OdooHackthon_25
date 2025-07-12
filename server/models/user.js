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

userSchema.pre('save', function (next) {
  if (!this.profilePhoto && this.name) {
    this.profilePhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      this.name
    )}&background=random&color=fff&bold=true`;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);