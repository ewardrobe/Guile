import { default as DbWrapper, db } from '../wrapper/mongoose';
import { default as appLogger, LogInterface } from '../logger/Log';
import mongoose from 'mongoose';

export class UserDb extends DbWrapper {
    constructor(mongoose:mongoose.Mongoose, logger:LogInterface) {
        super(mongoose, logger);
        let schema = {
            username: {
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
                enum: []
            },
            email: {
                type : String ,
                unique : true,
                required : true,
                dropDups: true
            },
        };
        let name = 'User';
        this.setup(schema, name);
    }
}

appLogger.info('USER Db created');
const User = new UserDb(db, appLogger);

export default User;
