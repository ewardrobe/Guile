require('express-async-errors');
import config from 'config';
import express from 'express';
import Logger from './logger/Log';
import dbConnection from './db/connect';

const ff = dbConnection;
const app = express();
require('./routes')(app);
const port = config.get('port') || 3000;
app.listen(port, () => Logger.info(`Listening on port ${port}...`));
