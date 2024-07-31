const { hash, compare } =require('bcrypt') ;
const Error = require('./errorHandler.js')
const config = require('../config/index.js');
async function hashPassword(password) {
    try {
        const saltRounds = parseInt(config.SALT)
        const hashedPassword = await hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        return Error.internalServerError(error.message);
    }
}

async function comparePassword(password, hashedPassword) {
    try {
        console.log('//////////')

        const match = await compare(password, hashedPassword);
        console.log(match)
        return match;
    } catch (error) {
        return Error.internalServerError(error.message);
    }
}

module.exports={
    hashPassword,
    comparePassword
}