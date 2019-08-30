import config from 'config';
import 'reflect-metadata';
import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import logger from '../logger/Log';

const dbConnection = async (): Promise<Connection> => {
    logger.info(config.get('database'));
    const connectionOptions = await getConnectionOptions(config.get('database'));
    return createConnection(connectionOptions);
};

export default dbConnection();
