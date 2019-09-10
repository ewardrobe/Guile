import swaggerUi from 'swagger-ui-express';
import 'reflect-metadata';
import express from 'express';
import * as core from "express-serve-static-core";
import * as swaggerDocument from './swagger.json';
import users from './routes/users';
import auth from './routes/auth';
import notFound from './middleware/notFound';
import errorHandler from './middleware/error';
import { apiResponseHandler } from './http/api-response-handler.js';

module.exports = (app: core.Express) => {
    app.use(express.json());
    app.use('/users', users);
    app.use('/auth', auth);
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(errorHandler);
    app.use(notFound);
}
