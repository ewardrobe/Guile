import * as c from '../db/connect';
import { default as logger, LogInterface }  from '../logger/Log';

console.log(c);

logger.info('User Service init');

export class UserService {
    userDb: UserDb
    logger: LogInterface 

    constructor(userDb: UserDb, logger: LogInterface) {
        this.userDb = userDb;
        this.logger = logger;
    }

    getUser(id: any) {
        this.userDb;
    }

    async getUsers(query: {}) {
        try {
            query = query || {};
            return await this.userDb.get(query);
        } catch (e) {
            this.logger.error(e);
        }
    }

    async addUser(user: any) {
        try {

            if (Array.isArray(user)) {

            }

            return this.userDb.create(user);
        } catch (e) {
            this.logger.error(e.message);
        }
    }
}

const userService = new UserService(User, logger);

export default userService;