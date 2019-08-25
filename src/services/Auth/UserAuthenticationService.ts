import { User } from "../../db/entity/User";
import bcrypt from 'bcrypt';
import { errorHandler, AppError } from "../../exception/exception";
import { default as logger, LogInterface } from "../../logger/Log";
import { default as userService, UserService, UserQuery } from "../Resource/UserService";

export class AuthenticaionError extends AppError {

}

export class UserAuthenticationService {
  private logger: LogInterface;
  private userService: UserService;
  constructor(UserService: UserService, Log: LogInterface) {
    this.logger = Log;
    this.userService = UserService;
  }

  public async authenticate(request: UserQuery): Promise<User> {

    if (!request.email || !request.password) {
      throw new AuthenticaionError('Email or Password is invalid or empty');
    }

    try {
      const user = await this.userService.getUserByEmail(request.email);
      const validPassword = await bcrypt.compare(request.password, user.password);
      
      if (!validPassword) {
        throw new AuthenticaionError('Invalid email or password').setStatusCode(400);
      }

      return user;
    } catch (ex) {
      errorHandler.processAndThrowCaughtError(ex, 'An error has occured during athentication');
    }
  }
}

export default new UserAuthenticationService(userService, logger);
