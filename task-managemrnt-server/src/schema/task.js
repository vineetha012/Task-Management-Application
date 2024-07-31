const joi = require('joi')
const createTaskSchema = {
    body: joi.object({
        title: joi.string().required(),
        description: joi.string(),
        status: joi.string().required(),
        priority: joi.string(),
        deadline: joi.date(),
    }),
}

const editTaskSchema = {
    body: joi.object({
        title: joi.string().required(),
        description: joi.string(),
        status: joi.string().required(),
        priority: joi.string(),
        deadline: joi.date(),
    }),
    params: joi.object().keys({
        id: joi.string().pattern(/^[0-9a-fA-F]{24}$/)
            .messages({
                'string.pattern.base': 'Invalid ObjectId format'
            })
    }),
}
const deleteTaskSchema = {
    params: joi.object().keys({
        id: joi.string().pattern(/^[0-9a-fA-F]{24}$/)
            .messages({
                'string.pattern.base': 'Invalid ObjectId format'
            })
    }),
}
module.exports = {
    createTaskSchema,
    editTaskSchema,
    deleteTaskSchema
}