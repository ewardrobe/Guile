import Logger, { LogInterface } from "../logger/Log";
import { AppError } from "../exception/exception";
import { ApiResponse } from ".";

class ApiResponseHandler {
    private logger: LogInterface;
    constructor(logger: LogInterface) {
        this.logger = logger;
    }

    public error(response: ApiResponse, error: Error): void {
        let message = error.message;
        let statusCode = 500;

        if (error instanceof AppError) {
            this.logger.error(error.getInternalMessage());
            statusCode = error.getStatusCode();
        } else {
            message = 'An unknown error has occured';
        }

        this.logger.error(error.message);

        response.status(statusCode).send({
            status: statusCode,
            error: message 
        });
    }

    public send(response: ApiResponse, data: any): void {
        response.send({
            data: data
        });
    }
}

export const apiResponseHandler = new ApiResponseHandler(Logger);