const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['incomplete', 'complete'],
        default: 'incomplete'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });  

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
