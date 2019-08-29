import config from 'config';
import jwt from 'jsonwebtoken';
import { AppRequest, AppResponse } from '../http';
import { errorHandler, AppError, InvalidAuthTokenError } from '../exception/exception';
import { apiResponseHandler } from '../http/api-response-handler';
import Logger from '../logger/Log';
import { default as UserService } from '../services/Resource/UserService';
import { object } from 'joi';

export default async (request: AppRequest, response: AppResponse, next: any) => {
    const authrorizationHeader = request.header('Authorization').trim();
    Logger.debug(authrorizationHeader);
    const token = authrorizationHeader.replace('Bearer ', '');
    Logger.debug(token);

    if (!token) response.status(401).send({
      error: 'Access denied. No token provided.'
    });

    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    request.user = decoded;
    const user = await UserService.getUser(request.user.id);

    if (!user) {
      throw new InvalidAuthTokenError('Token provided is no longer valid!').setStatusCode(401);
    }

    next();
}