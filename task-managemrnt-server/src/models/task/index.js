const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ['to-do', 'inprogress', 'under-review', 'completed']
    },
    priority: {
        type: String,
        enum: ['low', 'high', 'medium']
    },
    deadline: {
        type: Date
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
