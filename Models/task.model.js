const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        minlength: [2, 'Title must be at least 2 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    }
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
