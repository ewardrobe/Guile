import swaggerUi from 'swagger-ui-express';
import 'reflect-metadata';
import express from 'express';
import * as core from "express-serve-static-core";
import * as swaggerDocument from './swagger.json';
import users from './routes/users';
import auth from './routes/auth';
import errorHandler from './middleware/error';

module.exports = (app: core.Express) => {
    app.use(express.json());
    app.use('/users', users);
    app.use('/auth', auth);
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(errorHandler);
}
