const express = require('express');
const { registerUser, loginUser } = require('../middlewares/user'); // Import user middleware
const authenticateJWT = require('../middlewares/auth'); // Import authentication middleware
const User = require('../db/user'); // Import User model
const Task =require("../db/task");
const sendMail=require('../services/mailer');
const router = express.Router();

// User registration route
router.post('/register', registerUser); // Handles user registration

// User login route
router.post('/login', loginUser); // Handles user login

// Optional: Get user profile route (requires authentication)
router.get('/profile', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the JWT
        const user = await User.findById(userId).select('-password'); // Fetch user without password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user); // Return user profile
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Optional: Change password route (requires authentication)
router.put('/change-password', authenticateJWT, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // Get user ID from the JWT

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(currentPassword); // Check current password
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword; // Update password (will be hashed by pre-save hook)
        await user.save(); // Save the updated user

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/task',authenticateJWT,async(req,res)=>{
    try{
     const {title,description,dueDate,status}=req.body;
                  
     const newTask = new Task({
         title,
         description,
         dueDate,
         status:status || 'incomplete' ,
         createdBy:req.user.id});
         
         await newTask.save();
    res.status(201).json({message:"the task was successfully created " , Task : newTask});
 
    }
    
  catch(error){
     res.status(501).json({message:"the task is not created "})
 
 }});

router.get('/tasks',authenticateJWT,async(req,res)=>{
    try{
        const tasks = await Task.find({createdby:req.user.id})
        res.status(200).json(tasks);
    }
    catch(error){
        res.status(501).json({message:"the tasks are not found "})
    }
});

router.put('/tasks/:id', authenticateJWT, async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/tasks/:id',authenticateJWT,async (req,res)=>{

    try{
        const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
        if(!task){
            return res.status(404).json({ message: 'Task not found' });
        }
        else{
            res.status(200).json({ message: 'Task deleted successfully' });
        }
    }
catch(error){
    res.status(500).json({ message: error.message });

}
}
)


// Export the user routes
module.exports = router;
