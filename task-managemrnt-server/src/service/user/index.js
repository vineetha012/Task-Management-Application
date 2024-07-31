const User = require("../../models/user/index.js")
const errorHandler = require("../../utils/errorHandler.js")

const createUser = async (user) => {
    try {
        const userResponse = await User.create(user)
        return userResponse
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}

const getUserById=async(id)=>{
    try {
        const userObj = await User.findById(id)
        return userObj 
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}


const findUser = async (schema) => {
    try {
        const userObj = await User.find(schema)
        return userObj
    } catch (error) {
        return errorHandler.badRequest(error)
    }
}


module.exports = {
    createUser,
    getUserById,
    findUser
}