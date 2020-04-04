const Joi = require('@hapi/joi');


class User_Validation {

    static validateLogin(user) {

        const loginValidation = Joi.object({
            username: Joi.string()
                .required(),
            password: Joi.string()
                .regex(/[a-zA-Z0-9]{3,30}/)
                .required(),
        })

        return loginValidation.validate(user, { abortEarly: false });
    }





}


module.exports.User_Validation = User_Validation;