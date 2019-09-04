import { Connection } from "typeorm";
import dbConnection from "../../db/connect";
import { User } from "../../db/entity/User";
import { default as logger, LogInterface } from "../../logger/Log";
import { createValidator, updateValidator } from "../../validator/user";
import { AppError } from "../../exception/exception";
import {UserRepository} from "../../db/repository/UserRepository";
import _ from 'underscore';

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
      const user = await this.dbConnection.getCustomRepository(UserRepository).findOneById(id);
      
      return user;
  }

  public async getUserBy(query: any): Promise<User> {
    return this.dbConnection.getCustomRepository(UserRepository).findOne({
      where: query
    });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.dbConnection.getCustomRepository(UserRepository).findOneByEmail(email);
  }

  public async getUsers(query: object): Promise<User[]> {
    return this.dbConnection.getCustomRepository(UserRepository).find(query);
  }
 
  public async createUser(user: UserQuery): Promise<User> {
      await createValidator.validate(user);
      const userEmailExists = await this.getUserByEmail(user.email);
      const usernameExists = await this.getUserByEmail(user.email);
      
      if (userEmailExists) {
        throw new AppError(`User with email '${user.email}' already exists`).setStatusCode(400);
      }

      if (usernameExists) {
        throw new AppError(`Username '${user.username}' has already been taken`).setStatusCode(400);
      }

      const userEntity: User = this.dbConnection.getCustomRepository(UserRepository).create(user);

      return this.dbConnection.getCustomRepository(UserRepository).save(userEntity);
  }

  public async updateUser(userEntity: User, data: object): Promise<User> {
      await updateValidator.validate(data);
      const updatedUser = await this.dbConnection.getCustomRepository(UserRepository).merge(userEntity, data);
      await this.dbConnection.getCustomRepository(UserRepository).save(updatedUser);

      return userEntity;
  }
}

export default new UserService(dbConnection, logger);
