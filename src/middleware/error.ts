import { apiResponseHandler } from "../http/api-response-handler";
import { AppRequest, AppResponse, AppNextFunction } from "../http";
import Logger from "../logger/Log";
import { errorHandler } from "../exception/exception";

export default (err: any, req: AppRequest, res: AppResponse, next: AppNextFunction) => {
    Logger.info('Middleware error triggered');
    const error = errorHandler.processAndReturnCaughtError(err);
    apiResponseHandler.error(res, error);
} 