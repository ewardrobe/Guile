import "reflect-metadata";
import express = require('express');
const app = express();

let tt = '21';
//routes
import users from './routes/users';
import { User } from "./db/entity/User";
import { getConnectionOptions, createConnection, getConnection, Timestamp } from "typeorm";
app.use(express.json());
app.use('/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

createConnection();



let user = getConnection().getMongoRepository(User).create({
        firstName: "james",
        lastName: "atkins",
        dateOfBirth: "1985-08-24"
    });
    
    console.log('save User NOWWWWWWWW!!!!!!');

    async function test () {
        return await getConnection().manager.getMongoRepository(User).findOne('5d55d7dc4b38d1001b872e59');
    }
    
    let UserS = test();
    console.log(UserS);
