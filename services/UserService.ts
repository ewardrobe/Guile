
import Logger, { default as logger, LogInterface }  from '../logger/Log';
import { Connection, getConnection } from 'typeorm';
import { User } from '../db/entity/User';


logger.info('User Service init');

export class UserService {
    database: Connection
    logger: LogInterface 

    constructor(database: Connection, logger: LogInterface) {
        this.database = database;
        this.logger = logger;
    }

    async getUser(id?: string) {
        return await this.database.getRepository(User).findOne(id);
    }

    async getUsers(query: {}) {
        try {
            query = query || {};
            return await this.database.getRepository(User).find(query);
        } catch (e) {
            this.logger.error(e);
        }
    }

    async addUser(user: any) {
        try {

            if (Array.isArray(user)) {
                
            }

            return this.database.manager.create(user);
        } catch (e) {
            this.logger.error(e.message);
        }
    }
}

export default new UserService(getConnection(), Logger);