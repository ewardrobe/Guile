import swaggerUi from 'swagger-ui-express';
import 'reflect-metadata';
import express from 'express';
import * as core from "express-serve-static-core";
import users from './routes/users';
import auth from './routes/auth';
import notFound from './middleware/notFound';
import errorHandler from './middleware/error';
import { apiResponseHandler } from './http/api-response-handler.js';
import yaml from 'yamljs';

const swaggerDocument = yaml.load('./swagger.yaml');

module.exports = (app: core.Express) => {
    app.use(express.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/users', users);
    app.use('/auth', auth);
    app.use(errorHandler);
    app.use(notFound);

}
