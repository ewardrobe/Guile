import joi from "joi";

export const createRequestValidator = joi.object().keys({
    username: joi.string().alphanum().min(3).max(20).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: joi.string().email().required(),
    dateOfBirth: joi.string().isoDate(),
    firstName: joi.string().min(2).max(20).required(),
    lastName: joi.string().min(2).max(20).required()
});