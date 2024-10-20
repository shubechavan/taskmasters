const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin'); // Import admin routes
const userRouter = require('./routes/user');   // Import user routes
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Create an instance of an Express application
const PORT = process.env.PORT || 3000; // Set the port from environment variables or default to 3000

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB")) // Log success message
.catch(err => console.error("MongoDB connection error:", err)); // Log any connection errors

app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON requests

// Define application routes
app.use("/admin", adminRouter); // Use admin routes under /admin
app.use("/user", userRouter);   // Use user routes under /user


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log server start message
});
