import { AppNextFunction, AppResponse, AppRequest } from "../http";
import { RequestHandler } from "express";
import { loggers } from "winston";
import Logger from "../logger/Log";

export default (handler: RequestHandler) => {
    return async (req: AppRequest, res: AppResponse, next: AppNextFunction) => {
        try {
            await handler(req, res, next);
        }
        catch(ex) {
            Logger.info('Testing 123');
            next(ex);
        }
    }
} 