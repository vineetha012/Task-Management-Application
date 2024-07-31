const express = require('express')
const userController = require('../../controller/user/index.js')
const validate=require('../../middleware/validate.js')
const response = require('../../utils/response.js')
const { createUserSchema, loginSchema } =require('../../schema/user.js')
const server = express.Router()

server.post('/register', validate(createUserSchema), async (req, res, next) => {
    try {
        const userResponse = await userController.createUser(req)
        return response.send(userResponse, res)
    } catch (error) {
        return next(error)
    }
})

server.post('/user-login', validate(loginSchema), async (req, res, next) => {
    try {
        const userResponse = await userController.login(req)
        return response.send(userResponse, res)
    } catch (error) {
        return next(error)
    }
})
module.exports = server
