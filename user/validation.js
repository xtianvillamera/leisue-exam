const Joi = require('@hapi/joi');

exports.addUserValidation = (user) => {
    const schema = {
        fullName: Joi.string().required(),
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
        suspendStatus: Joi.string() 
    }

    return new Joi.ValidationError(user, schema);
}
exports.loginValidation = (user) => {
    const schema = {
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required()
    }

    return new Joi.ValidationError(user, schema);
}
