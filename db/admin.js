const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }); 

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

AdminSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password); 
};

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
