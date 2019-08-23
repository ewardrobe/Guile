import config from 'config';
import express = require('express');
import 'reflect-metadata';
import Logger from './logger/Log';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json'
import users from './routes/users';

const app = express();
app.use(express.json());
app.use('/users', users);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  
const port = config.get('port') || 3000;
app.listen(port, () => Logger.info(`Listening on port ${port}...`));
