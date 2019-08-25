import { default as Logger, LogInterface } from "../logger/Log";

export class AppError extends Error {
    private internalMessage: string = null;
    private statusCode: number = 500;
    public getStatusCode() {
        return this.statusCode;
    }

    public setStatusCode(statusCode: number) {
        this.statusCode = statusCode;
    }

    public getInternalMessage() {
        return this.internalMessage;
    }

    public setInternalMessage(internalMessage: string) {
        this.internalMessage = internalMessage;
    }
}

export class ResourceQueryError extends AppError {

}

class ErrorHandler {
    logger: LogInterface;
    constructor(logger: LogInterface) {
        this.logger = logger;
    }

    public handleCaughtError(error: Error, errorMessage: string = 'An error has occured') {
        this.logger.error(error.message);
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new AppError(errorMessage).setInternalMessage(error.message);
        }
    }
}

export const errorHandler = new ErrorHandler(Logger);