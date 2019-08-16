import "reflect-metadata";
import {createConnection, Connection, ConnectionManager, getConnectionManager, getConnectionOptions} from "typeorm";
import {User} from "./entity/User";
import config from "config";
import logger from "../logger/Log";

const dbConnection = async () => {
    logger.debug(config.get('database'));
    const connectionOptions = await getConnectionOptions(config.get('database'));
    return createConnection(connectionOptions);
};

export default dbConnection();