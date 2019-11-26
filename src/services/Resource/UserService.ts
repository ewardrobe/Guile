import { Connection } from "typeorm";
import dbConnection from "../../db/connect";
import { User } from "../../db/entity/User";
import { default as logger, LogInterface } from "../../logger/Log";
import userRequestValidator, { UserRequestValidator } from "../../validator/UserRequestValidator";
import { AppError } from "../../exception/exception";
import { UserRepository } from "../../db/repository/UserRepository";

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
  private userRequestValidator: UserRequestValidator;
  constructor(connection: Promise<Connection>, Log: LogInterface, userRequestValidator: UserRequestValidator) {
    this.setDbConnection(connection);
    this.logger = Log;
    this.userRequestValidator = userRequestValidator;
  }

  public async setDbConnection(connection: Promise<Connection>): Promise<void> {
    this.dbConnection = await connection;
  }

  public async getUser(id: string): Promise<User> {
    const user = await this.dbConnection.getCustomRepository(UserRepository).findOneById(id);
    
    return user;
  }

  public async getUserBy(query: any): Promise<User> {
    const user = await this.dbConnection.getCustomRepository(UserRepository).findOne({
      where: query
    });

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.dbConnection.getCustomRepository(UserRepository).findOneByEmail(email);
  }

  public async getUsers(query: object): Promise<User[]> {
    return await this.dbConnection.getCustomRepository(UserRepository).findAll(query);
  }
 
  public async createUser(user: UserQuery): Promise<User> {
      this.userRequestValidator.validatePost(user);
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
      this.userRequestValidator.validatePatch(data);
      const updatedUser = await this.dbConnection.getCustomRepository(UserRepository).merge(userEntity, data);
      await this.dbConnection.getCustomRepository(UserRepository).save(updatedUser);

      return userEntity;
  }
}

export default new UserService(dbConnection, logger, userRequestValidator);
