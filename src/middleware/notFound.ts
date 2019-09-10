import { apiResponseHandler } from "../http/api-response-handler";
import { AppRequest, AppResponse, AppNextFunction } from "../http";
import { AppError } from "../exception/exception";

export default (req: AppRequest, res: AppResponse, next: AppNextFunction) => {
    const error = new AppError('Not Found!');
    apiResponseHandler.error(res, error.setStatusCode(404));
} 