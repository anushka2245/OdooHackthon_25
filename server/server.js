const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db'); 
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 



// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Test Route
app.get('/', (req, res) => {
  res.send('Skill Swap API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
