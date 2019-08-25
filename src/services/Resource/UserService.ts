import { Connection } from "typeorm";
import dbConnection from "../../db/connect";
import { User } from "../../db/entity/User";
import { ResourceQueryError } from "../../exception/exception";
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
    } catch (e) {
      throw e;
    }
  }

  public async getUser(id: string): Promise<User> {
    try {
      return this.dbConnection.getRepository(User).findOne(id);
    } catch (ex) {
      this.logger.error(ex.message);
      throw new ResourceQueryError("User not found!");
    }
  }

  public async getUserByEmail(email: string) {
    try {
      return this.dbConnection.getRepository(User).findOne({
        where: {
          email: email
        }
      });
    } catch (ex) {
      this.logger.error(ex.message);
      throw new ResourceQueryError("User not found!");
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
