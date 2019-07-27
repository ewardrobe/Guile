const mongoose = require('../db');

const UserSchema = new mongoose.Schema({
    username:  {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    forename: {
        type: String,
        minlength: 3
    },
    surename: {
        type: String,
        minlength: 3
    },
    status: {
        type: String ,
        required: true,
        enum: [],
    },
    email: {
        type : String ,
        unique : true,
        required : true,
        dropDups: true
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User: User,
    UserSchema: UserSchema
};