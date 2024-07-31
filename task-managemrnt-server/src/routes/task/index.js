const express = require('express')
const { createTask, editTask, deleteTask, taskList, getSingleTask } = require('../../controller/task/index.js')
const response =require('../../utils/response.js')
const validate = require('../../middleware/validate.js')
const { createTaskSchema, deleteTaskSchema, editTaskSchema } = require('../../schema/task.js')
const server = express.Router()

server.post('/task', validate(createTaskSchema), async (req, res, next) => {
    try {
        const taskResponse=await createTask(req)
        return response.send(taskResponse, res)
    } catch (error) {
        return next(error)
    }
})

server.put('/task/:id', validate(editTaskSchema), async (req, res, next) => {
    try {
        const taskResponse = await editTask(req)
        return response.send(taskResponse, res)
    } catch (error) {
        return next(error)
    }
})

server.delete('/task/:id', validate(deleteTaskSchema), async (req, res, next) => {
    try {
        const taskResponse = await deleteTask(req)
        return response.send(taskResponse, res)
    } catch (error) {
        return next(error)
    }
})

server.get('/task', async (req, res, next) => {
    try {
        const taskResponse = await taskList(req)
        return response.send(taskResponse, res)
    } catch (error) {
        return next(error)
    }
})
server.get('/task'+'/:id', async (req, res, next) => {
    try {
        const taskResponse = await getSingleTask(req)
        return response.send(taskResponse, res)
    } catch (error) {
        return next(error)
    }
})
module.exports = server
