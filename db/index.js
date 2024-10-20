const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGODB_URI, { // Corrected the syntax here
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Import the User and Admin models
const User = require('./user');  // Import User model
const Admin = require('./admin');  // Import Admin model

// Export the models
module.exports = { User, Admin };
