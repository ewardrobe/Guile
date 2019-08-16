import "reflect-metadata";
import {createConnection, Connection, ConnectionManager, getConnectionManager, getConnectionOptions} from "typeorm";
import {User} from "./entity/User";


export const eWardobeDb = async () => {
    const connectionOptions = await getConnectionOptions("dev");
    return createConnection(connectionOptions);
};