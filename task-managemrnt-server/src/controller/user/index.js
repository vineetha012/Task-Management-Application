const errorHandler = require("../../utils/errorHandler")
const userService = require('../../service/user/index')
const { hashPassword, comparePassword } = require("../../utils/bcrypt")
const { generateToken } = require("../../utils/jwthandler")
const createUser = async (req) => {
    try {
        const userData = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        }
        const ExistedUser = await userService.findUser({ email: userData.email })
        if (ExistedUser.length !== 0) return errorHandler.badRequest({ message: 'User already existed' })

        const generatedHash = await hashPassword(userData.password)
        userData.password = generatedHash

        const userResponse = await userService.createUser(userData)
        console.log(ExistedUser)
        return {
            data: userResponse,
            message: 'user created sucessfully'
        }
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}

const login = async (req) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password
        }
        const user = await userService.findUser({ email: userData.email })
        if (user.length === 0) return errorHandler.badRequest({ message: 'User not found. Please create a new user.' })
        
        const isCorrectPassword = await comparePassword(userData.password, user[0].password)
        if (!isCorrectPassword) return errorHandler.badRequest({ message: 'Incorrect password.' })
        
        const token = generateToken({
            user: {
                userName: user[0].userName,
                email: user[0].email,
                id: user[0]._id
            }
        })
        return {
            data: {
                token: token
            },
            message: 'User login successful.'
        }
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}
module.exports = {
    createUser,
    login
}