import joi from '@hapi/joi';

const password = joi
  .string()
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .min(9)
  .max(30);
const username = joi
  .string()
  .regex(/^[a-zA-Z0-9-_.]{3,30}$/)
  .min(3)
  .max(20);

export const createValidator = joi.object().keys({
  dateOfBirth: joi.string().isoDate(),
  email: joi
    .string()
    .email()
    .required(),
  emailVerified: joi.bool().default(false),
  firstName: joi
    .string()
    .min(2)
    .max(20)
    .required(),
  lastName: joi
    .string()
    .min(2)
    .max(20)
    .required(),
  password: password.required(),
  passwordConfirm: joi
    .string()
    .required()
    .valid(joi.ref('password'))
    .options({
      language: {
        any: {
          allowOnly: '!!Passwords do not match',
        },
      },
    }),
  username: username.required(),
});

export const updateValidator = joi.object().keys({
  dateOfBirth: joi.string().isoDate(),
  email: joi.string().email(),
  emailVerified: joi.bool().default(false),
  firstName: joi
    .string()
    .min(2)
    .max(20),
  lastName: joi
    .string()
    .min(2)
    .max(20),
  password,
  username,
});
