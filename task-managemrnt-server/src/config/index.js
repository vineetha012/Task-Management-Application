const dotenv=require('dotenv')
dotenv.config({})
const envInfo = process.env
const config={
    MONGO_URI: envInfo.MONGO_URI,
    PORT: envInfo.PORT,
    SALT:10,
    JWT_SECRET:'taskmngmnt012'
}
module.exports=config