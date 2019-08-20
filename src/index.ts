import 'reflect-metadata';
import express = require('express');
import dbConnection from './db/connect';
import config from 'config';
import users from './routes/users';
import { User } from './db/entity/User';

const app = express();
app.use(express.json());
app.use('/users', users);

const port = config.get('port') || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
