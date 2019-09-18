import { default as Logger, LogInterface } from "../logger/Log";
import { ValidationError } from "@hapi/joi";

export class AppError extends Error {
    private internalMessage: string = null;
    private statusCode: number = 500;

    public getStatusCode() {
        return this.statusCode;
    }

    public setStatusCode(statusCode: number) {
        this.statusCode = statusCode;

        return this;
    }

    public getInternalMessage() {
        return this.internalMessage;
    }

    public setInternalMessage(internalMessage: string) {
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

class ErrorHandler {
    logger: LogInterface;
    constructor(logger: LogInterface) {
        this.logger = logger;
    }

    private processError(error: Error, errorMessage: string): AppError {
        this.logger.error(error);
        
        if (this.isJoiError(error)) {
            return new AppError(error.message).setStatusCode(400);
        } else if (error instanceof AppError) {
            return error;
        } else {
            return new AppError(errorMessage).setInternalMessage(error.message);
        }
    }

    private isJoiError(error: any) {
        if (typeof error.isJoi !== undefined && typeof error.name !== undefined) {
            if (error.isJoi === true && error.name === 'ValidationError') {
                return true;
            }
        }
        
        return false;
    }

    public processAndThrowCaughtError(error: Error, errorMessage: string = 'An unknown error has occured'): void {
        throw this.processError(error, errorMessage);
    }

    public processAndReturnCaughtError(error: Error, errorMessage: string = 'An unknown error has occured'): AppError {
        return this.processError(error, errorMessage);
    }
}

export const errorHandler = new ErrorHandler(Logger);