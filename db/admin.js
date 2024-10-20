const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define Admin Schema
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure each username is unique
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Pre-save Hook for Password Hashing
AdminSchema.pre('save', async function (next) {
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
AdminSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password); // Compare input with hashed password
};

// Export Admin Model
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
