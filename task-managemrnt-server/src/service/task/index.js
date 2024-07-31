const Task = require("../../models/task/index.js")
const errorHandler = require("../../utils/errorHandler.js")
const mongoose=require('mongoose')
const createTask=async(task)=>{
    try {
        const taskResponse = await Task.create(task)
        return taskResponse
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}


const getTaskById = async (id) => {
    try {
        const userObj = await Task.findById(id)
        return userObj
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}


const updateTask = async (id,task) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, task,{new:true})
        return updatedTask
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}

const deleteTask = async (id) => {
    try {
        return await Task.findByIdAndDelete(id)
        
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}

const findTask = async (query) => {
    try {
        const userObj = await Task.find(query)
        return userObj
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}

const getTaskList =async (user) =>{
    try {
        const taskList = await Task.aggregate([
            { $match: { user:new mongoose.Types.ObjectId(user) } },
            {
                $group: {
                    _id: '$status',
                    tasks: {
                        $push: {
                            id: '$_id',
                            title: '$title',
                            description: '$description',
                            status:'$status',
                            priority: '$priority',
                            deadline: '$deadline'
                        }
                    }
                }
            },
            {
                $addFields: {
                    id: '$_id',
                    title: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$_id', 'to-do'] }, then: 'To Do' },
                                { case: { $eq: ['$_id', 'inprogress'] }, then: 'In Progress' },
                                { case: { $eq: ['$_id', 'under-review'] }, then: 'Under Review' },
                                { case: { $eq: ['$_id', 'completed'] }, then: 'Completed' }
                            ],
                            default: 'Unknown'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]);

        return taskList
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}





module.exports={
    createTask,
    deleteTask,
    findTask,
    updateTask,
    getTaskById,
    getTaskList
}