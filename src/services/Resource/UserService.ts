import { Connection } from "typeorm";
import dbConnection from "../../db/connect";
import { User } from "../../db/entity/User";
import { default as logger, LogInterface } from "../../logger/Log";
import { createValidator, updateValidator } from "../../validator/user";
import { AppError } from "../../exception/exception";

export interface UserQuery {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  email?: string;
}

export class UserService {
  private logger: LogInterface;
  private dbConnection: Connection;
  constructor(connection: Promise<Connection>, Log: LogInterface) {
    this.setDbConnection(connection);
    this.logger = Log;
  }

  public async setDbConnection(connection: Promise<Connection>): Promise<void> {
    this.dbConnection = await connection;
  }

  public async getUser(id: string): Promise<User> {
      const user = await this.dbConnection.getRepository(User).findOne(id);
      this.logger.debug(user);
      
      return user;
  }

  public async getUserBy(query: any) {
    const user = await this.dbConnection.getRepository(User).findOne({
      where: query
    });

    return user;
  }

  public async getUserByEmail(email: string) {
    this.logger.debug(this.dbConnection);
    const user = await this.dbConnection.getRepository(User).findOne({
      where: {
        email: email
      }
    });

    return user;
  }

  public async getUsers(query: object): Promise<User[]> {
    return this.dbConnection.getRepository(User).find(query);
  }
 
  public async createUser(user: UserQuery): Promise<User> {
      await createValidator.validate(user);
      
      const repository = this.dbConnection.getRepository(User);
      const userEmailExists = await this.getUserByEmail(user.email);
      const usernameExists = await this.getUserByEmail(user.email);
      
      if (userEmailExists) {
        throw new AppError(`User with email '${user.email}' already exists`);
      }

      if (usernameExists) {
        throw new AppError(`Username '${user.username}' has already been taken`);
      }

      const userEntity: User = repository.create(user);

      return repository.save(userEntity);
  }

  public async updateUser(userEntity: User, data: object): Promise<User> {
      await updateValidator.validate(data);
      const repository = this.dbConnection.getRepository(User);
      const updatedUser = await repository.merge(userEntity, data);
      await repository.save(updatedUser);

      return userEntity;
  }
}

export default new UserService(dbConnection, logger);
