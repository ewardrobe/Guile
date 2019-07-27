const Joi = require('joi');
const Config = require('config');
const express = require('express');
const app = express();

//routes
const users = require('./routes/users');
const auth = require('./routes/auth')
app.use(express.json());

app.use('/users', users);
app.use('/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
