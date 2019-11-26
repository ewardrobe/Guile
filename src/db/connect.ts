import config from 'config';
import 'reflect-metadata';
import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import logger from '../logger/Log';
import { AppError } from '../exception/exception';

const dbConnection = async (): Promise<Connection> => {
    logger.info(config.get('database'));
    const connectionOptions = await getConnectionOptions(config.get('database'));
    let connection;
    try {
      connection = createConnection(connectionOptions);
    }
    catch (ex) {
        throw new AppError(ex.message);
    }

    return connection;
};

export default dbConnection();
