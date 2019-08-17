import { default as logger, LogInterface }  from '../logger/Log';
import { User } from '../db/entity/User';
import dbConnection from "../db/connect"
import { Connection } from 'typeorm';

logger.info('User Service init');

export class UserService {
    logger: LogInterface;
    dbConnection: Promise<Connection>;
    constructor(dbConnection: Promise<Connection>, logger: LogInterface) {
        this.dbConnection = dbConnection;
        this.logger = logger;
    }

    async getUser(id: string) {
        try {
            let connection = await this.dbConnection;
            return connection.getMongoRepository(User).findOne(id);
        } catch(e) {
            this.logger.error(e.message);
        }
    }

    async getUsers(query: object) {
        try {
            let connection = await this.dbConnection;
            return connection.getMongoRepository(User).find(query);
        } catch(e) {
            this.logger.error(e.message);
        }
    }

    async createUser(user: Object) {
        try {
            let connection = await this.dbConnection;
            let repository = connection.getMongoRepository(User);
            user = repository.create(user);
            return repository.save(user);
        } catch (e) {
            this.logger.error(e.message);
        }
    }
}

export default new UserService(dbConnection, logger);