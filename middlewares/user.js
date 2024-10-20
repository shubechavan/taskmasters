// middleware/user.js
const User = require('../db/user'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail=require('../services/mailer');
const secretKey = process.env.JWT_SECRET || 'your_secret_key';
const getSignupMessage = (username) => {
    return `Dear ${username},

Thank you for registering with us! We're excited to have you on board.

If you did not create an account, please ignore this email.

Best regards,
The TaskMaster Team`;
};
// User registration middleware
async function registerUser(req, res) {
    const { username, password, email } = req.body;

    console.log('Incoming registration data:', req.body); // Debug log

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save(); // Save the new user

        // Send welcome email
        const subject = "Welcome to TaskMaster!";
        const message = getSignupMessage(username);  // Use helper function to generate the message
        await sendEmail(email, subject, message);  // Send email to user

        res.status(201).json({ message: 'User registered successfully. Welcome email sent!' });
    } catch (error) {
        console.error('Signup error:', error); // Log the error for debugging
        res.status(500).json({ message: "Error during signup", error: error.message });
    }
}


// User login middleware
async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, secretKey, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Export the middleware functions
module.exports = { registerUser, loginUser };
