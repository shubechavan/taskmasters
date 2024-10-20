const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema Definition
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures each username is unique
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures each email is unique
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Define roles
        default: 'user', // Default role
    },
}, { timestamps: true });

// Pre-save Hook for Password Hashing
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next(); // Proceed with saving
    } catch (error) {
        next(error); // Handle errors
    }
});

// Method to Compare Passwords
UserSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password); // Compare input with hashed password
};

// Export User Model
const User = mongoose.model('User', UserSchema);
module.exports = User;
