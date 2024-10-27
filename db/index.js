const mongoose = require('mongoose');
require('dotenv').config(); 


mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


const User = require('./user');
const Admin = require('./admin');  


module.exports = { User, Admin };
