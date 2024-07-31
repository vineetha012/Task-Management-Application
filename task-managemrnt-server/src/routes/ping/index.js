const express=require('express')
const server=express.Router()
const response=require('../../utils/response')
const Error=require('../../utils/errorHandler')
server.get('/health-check',async(req,res,next)=>{
    try {
        return response.send({statusCode:200,message:'app is working fine'},res)
    } catch (error) {
        return Error.internalServerError(error)
    }
})
module.exports=server