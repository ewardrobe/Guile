import joi from 'joi';
import config from 'config';
import "reflect-metadata";
import {dbConnection} from './db/connect';
import express = require('express');
const app = express();

let tt = '21';
//routes
import users from './routes/users';
app.use(express.json());
app.use('/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
