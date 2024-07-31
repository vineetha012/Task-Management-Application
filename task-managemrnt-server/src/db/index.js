const mongoose = require('mongoose')
const config = require('../config/index')
const connectDb = async () => {
    try {
        await mongoose.connect(config.MONGO_URI).then(() => console.log("connected to db"))
        console.log("connected to db")
    } catch (error) {
        console.log('error', error.message)
        process.exit(1)
    }
}
module.exports = connectDb
