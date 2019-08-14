import joi from 'joi';
import config from 'config';
import "reflect-metadata";
import express from 'express';
const app = express();

//routes
import users from './routes/users';
//import auth from './routes/auth';
app.use(express.json());

app.use('/users', users);
//app.use('/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
