const joi=require('joi')
const createUserSchema = {
    body: joi.object({
        userName: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    }),
}

const loginSchema={
    body: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    }),
}

module.exports={
    createUserSchema,
    loginSchema
}