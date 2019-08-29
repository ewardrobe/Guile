import express, { json, Router } from 'express';
const router = Router();
import { ResourceNotFoundError, AppError } from '../exception/exception';
import logger from '../logger/Log';
import auth from '../middleware/auth';
import { default as userService } from '../services/Resource/UserService';
import { User } from '../db/entity/User';
import { AppRequest, AppResponse } from '../http';
import { apiResponseHandler } from '../http/api-response-handler';
express().use(json());

router.get('/', auth, async (request: AppRequest, response: AppResponse) => {
  const users = await userService.getUsers(request.body);
  apiResponseHandler.send(response, users);
});

router.post('/', async (request, response) => {
  logger.debug(request.body);
  const user: User = await userService.createUser(request.body);
  const token = await user.generateAuthToken();
  logger.debug(user);
  response.header('x-auth-token', token);
  apiResponseHandler.send(response, user);
});

router.get('/:id', async (request, response) => {
  const user = await userService.getUser(request.param('id'));

  if (!user) {
    throw new ResourceNotFoundError("User not found!").setStatusCode(404);
  }

  logger.info('get User by id');
  logger.debug(user);
  apiResponseHandler.send(response, user);
});

router.patch('/:id', async (request, response) => {
  let user = await userService.getUser(request.param('id'));

  if (!user) {
    throw new ResourceNotFoundError("User not found!").setStatusCode(404);
  }

  user = await userService.updateUser(user, request.body);
  response.json({
    data: user,
  });
});

export default router;
