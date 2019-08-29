import { AppNextFunction, AppResponse, AppRequest } from "../http";
import { RequestHandler } from "express";

export default (handler: RequestHandler) => {
    return async (req: AppRequest, res: AppResponse, next: AppNextFunction) => {
        try {
            await handler(req, res, next);
        }
        catch(ex) {
            next(ex);
        }
    }
} 