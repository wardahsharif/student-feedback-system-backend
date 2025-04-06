const joi = require('joi');

const loginSchema = joi.object({
    email: joi.string().email().required().lowercase(),
    password: joi.string().min(6).required(),
});

module.exports = loginSchema;