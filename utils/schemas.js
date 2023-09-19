const Joi = require('joi');

module.exports = {
    'Schemas': {
        register: Joi.object({
            name: Joi.string().min(3).max(100).required(),
            email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
            password: Joi.string().min(6).max(20).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/).required()
        }),
        login: Joi.object({
            email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
            password: Joi.string().min(6).max(20).required()
        })
    }
};