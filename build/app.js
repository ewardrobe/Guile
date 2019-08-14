require("reflect-metadata");
var express_1 = require('express');
var app = express_1.default();
//routes
var users_1 = require('./routes/users');
//import auth from './routes/auth';
app.use(express_1.default.json());
app.use('/users', users_1.default);
//app.use('/auth', auth);
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("Listening on port " + port + "..."); });
