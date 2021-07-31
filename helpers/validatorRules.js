const joi = require('joi');

const userValidatorRule = joi
    .object({
        username: joi.string().alphanum().min(3).max(25).trim(true).required(),
        password: joi.string().min(4).trim(true).required(),
        phone: joi
            .string()
            .length(10)
            .pattern(/[6-9]{1}[0-9]{9}/)
            .required(),
        telephone: joi.number(),
    })
    .options({ abortEarly: false });

module.exports = { userValidatorRule };
