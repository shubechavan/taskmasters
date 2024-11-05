const express = require('express');
const { isAdmin } = require('../middlewares/admin'); 
const User = require('../db/user'); 
const router = express.Router(); 


router.get('/users', isAdmin, async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users); // Send the list of users as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Send error message on failure
    }
});

// Delete a user by ID (admin only)
router.delete('/users/:id', isAdmin, async (req, res) => {
    try {
        const userId = req.params.id; // Get the user ID from the request parameters
        const deletedUser = await User.findByIdAndDelete(userId); // Delete the user

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
        }

        res.status(200).json({ message: 'User deleted successfully' }); // Send success message
    } catch (error) {
        res.status(500).json({ message: error.message }); // Send error message on failure
    }
});

// Export the router
module.exports = router;
