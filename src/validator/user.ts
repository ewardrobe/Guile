import joi from "@hapi/joi";

export const createValidator = joi.object().keys({
    username: joi.string().regex(/^[a-zA-Z0-9-_.]{3,30}$/).min(3).max(20).required(),
    email: joi.string().email().required(),
    emailVerified: joi.bool().default(false),
    firstName: joi.string().min(2).max(20).required(),
    lastName: joi.string().min(2).max(20).required()
})

export const updateValidator = joi.object().keys({
    username: joi.string().regex(/^[a-zA-Z0-9-_.]{3,30}$/).min(3).max(20),
    password: joi.forbidden(),
    email: joi.string().email(),
    emailVerified: joi.bool().default(false),
    dateOfBirth: joi.string().isoDate(),
    firstName: joi.string().min(2).max(20),
    lastName: joi.string().min(2).max(20)
})

export const registrationValidator = joi.object().keys({
    username: joi.string().regex(/^[a-zA-Z0-9-_.]{3,30}$/).min(3).max(20).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: joi.string().email().required(),
    emailVerified: joi.bool().default(false),
    dateOfBirth: joi.string().isoDate(),
    firstName: joi.string().min(2).max(20).required(),
    lastName: joi.string().min(2).max(20).required()
})