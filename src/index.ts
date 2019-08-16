import "reflect-metadata";
import express = require('express');
import dbConnection from "./db/connect"
const app = express();

let tt = '21';
//routes
import users from './routes/users';
import { User } from "./db/entity/User";
import { getConnectionOptions, createConnection, getConnection, Timestamp, Connection } from "typeorm";
app.use(express.json());
app.use('/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


const eWardobeDb = async () => {
    const connection = await dbConnection();
    

    let u = connection.getMongoRepository(User).create({
        firstName: "james",
        lastName: "atkins",
        dateOfBirth: "1985-08-24"
    });

    async function test (u: User) {
        return await connection.manager.getMongoRepository(User).save(u);
    }
    
    let UserS = await test(u);
    console.log(UserS);
    console.log('save User NOWWWWWWWW!!!!!!');
}
    
eWardobeDb();