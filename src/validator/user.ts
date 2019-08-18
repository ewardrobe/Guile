import joi from "@hapi/joi";

export const createRequestValidator = joi.object().keys({
    username: joi.string().regex(/^[a-zA-Z0-9-_.]{3,30}$/).min(3).max(20).required(),
    email: joi.string().email().required(),
    emailVerified: joi.bool().default(false),
    firstName: joi.string().min(2).max(20).required(),
    lastName: joi.string().min(2).max(20).required()
})

export const registrationRequestValidator = joi.object().keys({
    username: joi.string().regex(/^[a-zA-Z0-9-_.]{3,30}$/).min(3).max(20).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: joi.string().email().required(),
    emailVerified: joi.bool().default(false),
    dateOfBirth: joi.string().isoDate(),
    firstName: joi.string().min(2).max(20).required(),
    lastName: joi.string().min(2).max(20).required()
})