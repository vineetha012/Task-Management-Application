const dotenv=require('dotenv')
dotenv.config({})
const envInfo = process.env
const config={
    MONGO_URI: envInfo.MONGO_URI || 'mongodb + srv://vineetha:vineetha10x@vineetha-cluster.inwcmoa.mongodb.net/task-management?retryWrites=true&w=majority',
    PORT: envInfo.PORT||8080,
    SALT:10,
    JWT_SECRET:'taskmngmnt012'
}
module.exports=config