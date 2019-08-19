import { default as logger, LogInterface }  from '../logger/Log';
import { User } from '../db/entity/User';
import dbConnection from "../db/connect"
import bcrypt from "bcrypt";
import { createValidator, registrationValidator, updateValidator } from "../validator/user"
import { Connection, ObjectID } from 'typeorm';

export class UserService {
    logger: LogInterface;
    dbConnection: Connection;
    constructor(dbConnection: Promise<Connection>, logger: LogInterface) {
        this.setDbConnection(dbConnection);
        this.logger = logger;
    }

    async setDbConnection(dbConnection: Promise<Connection>) {
        try {
            this.dbConnection = await dbConnection;
        } catch(e) {
            throw e;
        }
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

    async createUser(user: Object, registration: boolean = false) {
        try {
            createValidator.validate(user);
            let repository = this.dbConnection.getRepository(User);
            let userEntity:User = repository.create(user);
            return repository.save(userEntity);
        } catch (e) {
            this.logger.error(e.message);
            return e;
        }
    }

    async registerUser(user: Object) {
        try {
            registrationValidator.validate(user);
            let repository = this.dbConnection.getRepository(User);
            user = repository.create(user);
            return repository.save(user);
        } catch (e) {
            this.logger.error(e.message);
            return e;
        }
    }

    async updateUser(userEntity: User, data: object) {
        try {
            await updateValidator.validate(data);
            let repository = this.dbConnection.getRepository(User);
            let updatedUser = await repository.merge(userEntity, data);
            await repository.save(updatedUser);
            console.log(updatedUser);

            return userEntity;
        } catch (e) {
            this.logger.error(e.message);
            throw e;
        }
    }
}

export default new UserService(dbConnection, logger);