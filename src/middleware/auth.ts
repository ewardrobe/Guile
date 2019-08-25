import config from 'config';
import jwt from 'jsonwebtoken';
import { ApiRequest, ApiResponse } from '../http';
import { errorHandler, AppError } from '../exception/exception';
import { apiResponseHandler } from '../http/api-response-handler';

export default function auth(request: ApiRequest, response: ApiResponse, next: any) {
    const authrorizationHeader = request.header('Authorization').trim();
    const token = authrorizationHeader.replace('Bearer ', '');

    if (!token) response.status(401).send({
      error: 'Access denied. No token provided.'
    });

    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));
      request.user = decoded;
    } catch (ex) {
      const error: AppError = errorHandler.processAndReturnCaughtError(ex, 'Invalid token.').setStatusCode(400);
      apiResponseHandler.error(response, error);
    }
}