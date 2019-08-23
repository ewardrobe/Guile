import { Connection } from "typeorm";
import dbConnection from "../db/connect";
import { User } from "../db/entity/User";
import { LookupError } from "../exception";
import { default as logger, LogInterface } from "../logger/Log";
import { createValidator, updateValidator } from "../validator/user";

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
    } catch (e) {
      throw e;
    }
  }

  public async getUser(id: string): Promise<User> {
    try {
      return await this.dbConnection.getRepository(User).findOne(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new LookupError("User not found!");
    }
  }

  public async getUsers(query: object): Promise<User[]> {
    try {
      return this.dbConnection.getRepository(User).find(query);
    } catch (e) {
      this.logger.error(e.message);
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
