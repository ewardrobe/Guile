import Logger, { LogInterface } from "../logger/Log";
import { AppError } from "../exception/exception";
import { AppResponse } from ".";

class ApiResponseHandler {
    private logger: LogInterface;
    constructor(logger: LogInterface) {
        this.logger = logger;
    }

    public error(response: AppResponse, error: Error): void {
        let message = error.message;
        let statusCode = 500;

        if (error instanceof AppError) {
            statusCode = error.getStatusCode();
        } else {
            message = 'An unknown error has occured';
        }

        response.status(statusCode).send({
            status: statusCode,
            error: message 
        });
    }

    public send(response: AppResponse, data: any): void {
        response.send({
            data: data
        });
    }
}

export const apiResponseHandler = new ApiResponseHandler(Logger);