import joi, {ValidationError} from '@hapi/joi';
import {AppError} from "../exception/exception";

function joiLanguage(path: string, message, joiLanguageObject: object = {}, topLevelObject: object = {}) {
    const explodedPath = path.split('.');
    const key = explodedPath.shift();

    if (!explodedPath.values()) {
        joiLanguageObject[explodedPath[key]] = message;
        return joiLanguageObject;
    }

    if (!joiLanguageObject) {
        topLevelObject = joiLanguageObject;
    }

    joiLanguageObject[explodedPath[key]] = {};

    return joiLanguage(explodedPath.join('.'), message, joiLanguageObject[explodedPath[key]], topLevelObject);
}

const password = joi
    .string()
    .regex(/^[a-zA-Z0-9_\-!$&*()^£@#/.><]{3,30}$/)
    .min(9)
    .max(30)
    .options({
        language: {
            string: {
                regex: {
                    base: 'Password must match patten (a-zA-Z0-9_\-!$&*()^£@#/.><)'
                }
            }
        }
    });
    joiLanguage('language.string.regex.base', 'Password must match patten (a-zA-Z0-9_\-!$&*()^£@#/.><)');



const username = joi
    .string()
    .regex(/^[a-zA-Z0-9-_.]{3,30}$/)
    .min(3)
    .max(20)
    .options({
        language: {
            string: {
                regex: {
                    base: 'Username must match patten (a-zA-Z0-9_\-!$&*()^£@#/.><)'
                }
            }
        }
    });

export class UserRequestValidator {
    validatePost(post: object) {
        const validator = joi.object().keys({
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
                .any()
                .valid(joi.ref('password'))
                .required(),
            username: username.required(),
        });

        const result = validator.validate(post);

        if (result.error) {
            throw new AppError(this.formatMessage(result.error.details[0].message));
        } else {
            return true;
        }
    }

    formatMessage(errorMessage: string): string {
        return errorMessage.replace(/".*"/g, '');
    }

    validatePatch(patch: object) {
        const validator = joi.object().keys({
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

        const result = validator.validate(patch);

        if (result.error) {
            throw new AppError(result.error.message);
        } else {
            return true;
        }
    }
}

const userRequestValidator = new UserRequestValidator();

export default userRequestValidator;