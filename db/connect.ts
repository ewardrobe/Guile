import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import config = require("config");
import {User} from "./entity/User";
import logger from "../logger/Log"

let port:number = config.get('database.port');
let host:string = config.get('database.host');
let database:string = config.get('database.name');
let user:string = config.get('database.user');

let dbConnection = null;

createConnection({
    type: "mongodb",
    host: host,
    port: port,
    username: user,
    database: database,
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    dbConnection = connection;
}).catch(error => console.log(error));

export  dbConnection;


// import "reflect-metadata";
// import {createConnection} from "typeorm";
// import {User} from "./entity/User";

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.forename = "Timber";
//     user.surname = "Saw";
//     user.dateOfBirth = "1985-08-24";
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
