import config from 'config';
import jwt from 'jsonwebtoken';

 
export function auth(request, response, next) {
    const token = request.header('x-auth-token');
    if (!token) response.status(401).send({
      error: 'Access denied. No token provided.'
    });

    try {
      const decoded = jwt.verify(token, config.get(''));
      request.user = decoded;
    } catch (ex) {
      response.status(400).send({
        error: 'Invalid token.'
      })
    }
}