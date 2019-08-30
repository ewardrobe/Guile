import { Connection } from "typeorm";
import dbConnection from "../../db/connect";
import { User } from "../../db/entity/User";
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
    this.dbConnection = await connection;
  }

  public async getUser(id: string): Promise<User> {
      const user = await this.dbConnection.getRepository(User).findOne(id);
      this.logger.debug(user);
      
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
 
  public async createUser(user: object): Promise<User> {
      await createValidator.validate(user);
      const repository = this.dbConnection.getRepository(User);
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
