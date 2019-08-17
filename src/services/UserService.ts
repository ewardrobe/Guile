import { default as logger, LogInterface }  from '../logger/Log';
import { User } from '../db/entity/User';
import dbConnection from "../db/connect"
import { Connection } from 'typeorm';

logger.info('User Service init');

export class UserService {
    logger: LogInterface;
    dbConnection: Connection;
    constructor(dbConnection: Promise<Connection>, logger: LogInterface) {
        this.setDbConnection(dbConnection);
        this.logger = logger;
    }

    async setDbConnection(dbConnection: Promise<Connection>) {
        this.dbConnection = await dbConnection;
    }

    async getUser(id: string) {
        try {
            return this.dbConnection.getRepository(User).findOne(id);
        } catch(e) {
            this.logger.error(e.message);
        }
    }

    async getUsers(query: object) {
        try {
            return this.dbConnection.getRepository(User).find(query);
        } catch(e) {
            this.logger.error(e.message);
        }
    }

    async createUser(user: Object) {
        try {
            let repository = this.dbConnection.getRepository(User);
            user = repository.create(user);
            return repository.save(user);
        } catch (e) {
            this.logger.error(e.message);
        }
    }
}

export default new UserService(dbConnection, logger);