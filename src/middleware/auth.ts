import config from 'config';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { ApiRequest, ApiResponse } from '../http';

 
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
      response.status(400).send({
        error: 'Invalid token.'
      })
    }
}