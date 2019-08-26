import { Connection } from "typeorm";
import dbConnection from "../../db/connect";
import { User } from "../../db/entity/User";
import { ResourceNotFoundError, errorHandler } from "../../exception/exception";
import { default as logger, LogInterface } from "../../logger/Log";
import { createValidator, updateValidator } from "../../validator/user";

export interface UserQuery {
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
}

export class UserService {
  private logger: LogInterface;
  private dbConnection: Connection;
  constructor(connection: Promise<Connection>, Log: LogInterface) {
    this.setDbConnection(connection);
    this.logger = Log;
  }

  public async setDbConnection(connection: Promise<Connection>): Promise<void> {
    try {
      this.dbConnection = await connection;
    } catch (ex) {
      errorHandler.processAndThrowCaughtError(ex);
    }
  }

  public async getUser(id: string): Promise<User> {
    try {
      const user = await this.dbConnection.getRepository(User).findOne(id);
      this.logger.debug(user);
      return user;
    } catch (ex) {
      errorHandler.processAndThrowCaughtError(ex);
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const user = await this.dbConnection.getRepository(User).findOne({
        where: {
          email: email
        }
      });

      return user;
    } catch (ex) {
      errorHandler.processAndThrowCaughtError(ex);
    }
  }

  public async getUsers(query: object): Promise<User[]> {
    try {
      return this.dbConnection.getRepository(User).find(query);
    } catch (ex) {
      errorHandler.processAndThrowCaughtError(ex);
    }
  }
 
  public async createUser(user: object): Promise<User> {
    try {
      await createValidator.validate(user);
      const repository = this.dbConnection.getRepository(User);
      const userEntity: User = repository.create(user);
      return repository.save(userEntity);
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  }

  public async updateUser(userEntity: User, data: object): Promise<User> {
    try {
      await updateValidator.validate(data);
      const repository = this.dbConnection.getRepository(User);
      const updatedUser = await repository.merge(userEntity, data);
      await repository.save(updatedUser);

      return userEntity;
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  }
}

export default new UserService(dbConnection, logger);
