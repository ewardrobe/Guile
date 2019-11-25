import { default as Logger, LogInterface } from "../logger/Log";
import { ValidationError } from "@hapi/joi";

export class AppError extends Error {
    private internalMessage: string = null;
    private statusCode: number = 500;

    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }

    getStatusCode() {
        return this.statusCode;
    }

    setStatusCode(statusCode: number) {
        this.statusCode = statusCode;

        return this;
    }

    getInternalMessage() {
        return this.internalMessage;
    }

    setInternalMessage(internalMessage: string) {
        this.internalMessage = internalMessage;

        return this;
    }
}

export class AuthenticaionError extends AppError {

}

export class ResourceNotFoundError extends AppError {
}

export class InvalidAuthTokenError extends AppError {

}