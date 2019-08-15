import "reflect-metadata";
import {createConnection, Connection, ConnectionManager, getConnectionManager} from "typeorm";
import config = require("config");
import {User} from "./entity/User";

let port:number = config.get('database.port');
let host:string = config.get('database.host');
let database:string = config.get('database.name');
let user:string = config.get('database.user');

const connectionManager = getConnectionManager();

export const dbConnection = connectionManager.create({
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
});
