require('express-async-errors');
import config from 'config';
import express = require('express');
import Logger from './logger/Log';

const app = express();
app.set('logger', Logger);
require('./routes')(app);
const port = config.get('port') || 3000;
app.listen(port, () => Logger.info(`Listening on port ${port}...`));
