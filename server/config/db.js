const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected with Mongoose');
  } catch (error) {
    console.error('❌ Mongoose Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
