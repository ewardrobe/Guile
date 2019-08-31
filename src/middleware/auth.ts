import config from 'config';
import jwt from 'jsonwebtoken';
import { AppRequest, AppResponse } from '../http';
import { InvalidAuthTokenError, errorHandler, AppError, AuthenticaionError } from '../exception/exception';
import Logger from '../logger/Log';
import { default as UserService } from '../services/Resource/UserService';
import { apiResponseHandler } from '../http/api-response-handler';

export default async (request: AppRequest, response: AppResponse, next: any) => {
  
  if (typeof request.header('Authorization') !== 'string') {  
    throw new InvalidAuthTokenError('No Authorization headers sent!').setStatusCode(401);
  }

  const authrorizationHeader = request.header('Authorization').trim();
  const token = authrorizationHeader.replace('Bearer ', '');

  if (!token) {
    throw new AuthenticaionError('Access denied. No token provided.').setStatusCode(401);
  }

  try {
    const decoded = await jwt.verify(token, config.get('jwtPrivateKey'));
    request.user = decoded;
    const user = await UserService.getUser(request.user.id);

    if (!user) {
      throw new InvalidAuthTokenError('Token provided is no longer valid!').setStatusCode(401);
    }
  } 

  catch (ex) {
    if (ex !instanceof jwt.JsonWebTokenError) {
      throw new InvalidAuthTokenError('Authentication token provided is invalid').setStatusCode(401);
    } else {
      throw ex;
    }
  }

  next();
}