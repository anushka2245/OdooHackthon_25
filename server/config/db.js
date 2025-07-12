const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

let _db;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Use database from MONGO_URI (skill_swap)
    _db = client.db(); 

    console.log('✅ Connected to MongoDB: skill_swap');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return _db;
};

module.exports = { connectDB, getDb };
