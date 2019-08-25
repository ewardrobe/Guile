import { default as Logger, LogInterface } from "../logger/Log";

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

export class ResourceQueryError extends AppError {

}

class ErrorHandler {
    logger: LogInterface;
    constructor(logger: LogInterface) {
        this.logger = logger;
    }

    private processError(error: Error, errorMessage: string): AppError {
        this.logger.error(error.message);
        if (error instanceof AppError) {
            return error;
        } else {
            return new AppError(errorMessage).setInternalMessage(error.message);
        }
    }

    public processAndThrowCaughtError(error: Error, errorMessage: string = 'An error has occured'): void {
        throw this.processError(error, errorMessage);
    }

    public processAndReturnCaughtError(error: Error, errorMessage: string = 'An error has occured'): AppError {
        return this.processError(error, errorMessage);
    }
}

export const errorHandler = new ErrorHandler(Logger);