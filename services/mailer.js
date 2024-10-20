// utils/email.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to your preferred email service
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email address
        to, // Recipient's email address
        subject, // Email subject
        text, // Email body text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', to);
    } catch (error) {
        console.error('Error sending email:', error.message); // Log only the error message for better clarity
        throw new Error('Email sending failed'); // Throw error for calling function to handle it if needed
    }
};

module.exports = sendEmail; // Export the function directly
