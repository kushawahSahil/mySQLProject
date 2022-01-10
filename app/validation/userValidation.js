const Joi = require("@hapi/joi");

function registrationValidation(req) {
    const schema = Joi.object({
        First_name: Joi.string().empty().required().messages({
            "string.base": `First_name should be a type of 'string'`,
            "string.empty": `First_name can not an empty field`,
            "any.required": `First_name name is a required field`,
        }),
        Last_name: Joi.string().empty().required().messages({
            "string.base": `Last_name should be a type of 'string'`,
            "string.empty": `Last_name can not an empty field`,
            "any.required": `Last_name name is a required field`,
        }),
        gender: Joi.string().empty().required().messages({
            "string.base": `gender should be a type of 'string'`,
            "string.empty": `gender can not an empty field`,
            "any.required": `gender is a required field`,
        }),
        hobby: Joi.required().empty().messages({
            "string.base": `hobby should be choose`,
            "string.empty": `hobby can not an empty field`,
            "any.required": `hobby is a required field`,
        }),
        mobile_number: Joi.number().empty().required().messages({
            "number.base": `mobile_number should be a type of 'number'`,
            "number.empty": `mobile_number can not an empty field`,
            "any.required": `mobile_number is a required field`,
        }),
        email: Joi.string().empty().required().messages({
            "string.base": `email should be a type of 'string'`,
            "string.empty": `email can not an empty field`,
            "any.required": `email is a required field`,
        }),
        user_password: Joi.string().empty().required().messages({
            "string.base": `user_password should be a type of 'string'`,
            "string.empty": `user_password can not an empty field`,
            "any.required": `user_password is a required field`,
        }),
        confirm_password: Joi.string().empty().required().valid(Joi.ref('user_password')).messages({
            "string.base": `confirm_password should be a type of 'string'`,
            "string.empty": `confirm_password can not an empty field`,
            "any.required": `confirm_password is a required field`,
        }),
        city: Joi.string().empty().required().messages({
            "string.base": `city should be a type of 'string'`,
            "string.empty": `city can not an empty field`,
            "any.required": `city is a required field`,
        }),
    })
    return schema.validate(req);
}


function loginValidation(req) {
    const schema = Joi.object({
        email: Joi.string().empty().email().required().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email cannot be an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        }),
        user_password: Joi.string().empty().min(6).max(16).required().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        })
    })
    const options = {
        abortEarly: false,
    }
    return schema.validate(req, options);
}

function passwordValidation(req) {
    const schema = Joi.object({
        email: Joi.string().empty().required().email().messages({
            "string.base": `email should be a type of 'string'`,
            "string.empty": `email can not an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        })
    })
    const options = {
        abortEarly: false,
    };
    return schema.validate(req, options);
}

function newPasswordValidation(req) {
    const schema = Joi.object({
        email: Joi.string().empty().email().required().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email can not an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email name is a required field`,
        }),
        user_password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `Password should be a type of'text'`,
            "string.empty": `Password con not be an empty field`,
            "string.min": `Password should be of minimum 6 character`,
            "string.max": `Password should be of maximum 16 character`,
            "any.required": `Password is a require field`,
        }),
        Confirm_password: Joi.string().required().valid(Joi.ref('user_password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    })
    const options = {
        abortEarly: false
    };
    return schema.validate(req, options);
}

function resetPasswordValidation(req) {
    const schema = Joi.object({
        password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        user_password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        Confirm_password: Joi.string().required().valid(Joi.ref('user_password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    })
    const options = {
        abortEarly: false, // include all errors
    };
    return schema.validate(req, options);
}

function updateProfileValidation(req) {
    const schema = Joi.object({
        First_name: Joi.string().empty().required().messages({
            "string.base": `first name should be a type of 'string'`,
            "string.empty": `first can not an empty field`,
            "any.required": `first name is a required field`,
        }),
        Last_name: Joi.string().empty().required().messages({
            "string.base": `second name should be a type of 'string'`,
            "string.empty": `second can not an empty field`,
            "any.required": `second name is a required field`,
        }),
        gender: Joi.string().empty().required().messages({
            "string.base": `gender should be a type of 'string'`,
            "string.empty": `gender can not an empty field`,
            "any.required": `gender is a required field`,
        }),
        hobby: Joi.required().empty().messages({
            "string.base": `hobby should be choose`,
            "string.empty": `hobby can not an empty field`,
            "any.required": `hobby is a required field`,
        }),
        mobile_number: Joi.number().empty().required().messages({
            "number.base": `mobile should be a type of 'number'`,
            "number.empty": `mobile can not an empty field`,
            "any.required": `mobile is a required field`,
        }),
        email: Joi.string().empty().required().messages({
            "string.base": `email should be a type of 'string'`,
            "string.empty": `email can not an empty field`,
            "any.required": `email is a required field`,
        }),
        city: Joi.string().empty().required().messages({
            "string.base": `city should be a type of 'string'`,
            "string.empty": `city can not an empty field`,
            "any.required": `city is a required field`,
        }),
    })
    return schema.validate(req);
}


module.exports = { registrationValidation, loginValidation, passwordValidation, newPasswordValidation, resetPasswordValidation, updateProfileValidation }
