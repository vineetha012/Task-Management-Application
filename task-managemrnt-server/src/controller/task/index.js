const errorHandler = require("../../utils/errorHandler")
const taskService = require('../../service/task/index');
const { formatTaskList } = require("../../utils/common");
const createTask = async (req) => {
    try {
        const { title, description, status, priority, deadline } = req.body;
        const taskResponse = await taskService.createTask({
            title,
            description,
            status,
            priority,
            deadline,
            user: req.user._id
        })
        return {
            data: taskResponse,
            message: 'task created sucessfully'
        }
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}
const editTask = async (req) => {
    try {
        const id = req.params.id

        const { title, description, status, priority, deadline } = req.body;
        const taskResponse = await taskService.updateTask(id, {
            title,
            description,
            status,
            priority,
            deadline,
            user: req.user._id
        })
        return {
            data: taskResponse,
            message: 'task updated sucessfully'
        }
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}
const deleteTask = async (req) => {
    try {
        const id = req.params.id
        const taskResponse = await taskService.deleteTask(id)
        return {
            message: 'task deleted sucessfully',
            taskResponse
        }
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}
const taskList = async (req) => {
    try {
        const taskList = await taskService.getTaskList(req.user._id)
        const formattedResponse = formatTaskList(taskList)
        return {
            data: formattedResponse,
            message: 'sucessfully fetched Task list'
        }
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}
const getSingleTask = async (req) => {
    try {
        const task = await taskService.getTaskById(req.user._id)
        if(!task){
            return errorHandler.notFound({message:'task not found'})
        }
        return {
            data: task,
            message: 'sucessfully fetched Task list'
        }
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}
module.exports = {
    createTask,
    editTask,
    taskList,
    deleteTask,
    getSingleTask
}