import express, { json, Router } from 'express';
const router = Router();
import { ResourceQueryError } from '../exception/exception';
import logger from '../logger/Log';
import auth from '../middleware/auth';
import { default as userService } from '../services/Resource/UserService';
import { User } from '../db/entity/User';
import { ApiRequest, ApiResponse } from '../http';
import { apiResponseHandler } from '../http/api-response-handler';
express().use(json());

router.get('/', auth, async (request: ApiRequest, response: ApiResponse) => {
  logger.debug(request.body);
  const users = await userService.getUsers(request.body);
  logger.debug(users);
  response.json({
    data: users,
  });
});

router.post('/', async (request, response) => {
  try {
    logger.debug(request.body);
    const user: User = await userService.createUser(request.body);
    const token = await user.generateAuthToken();
    logger.debug(user);
    response.header('x-auth-token', token);
    apiResponseHandler.send(response, user);
  } catch (ex) {
    apiResponseHandler.error(response, ex);
  }
});

router.get('/:id', async (request, response) => {
  try {
    const user = await userService.getUser(request.param('id'));
    logger.info('get User by id');
    logger.debug(user);
    apiResponseHandler.send(response, user);
  } catch (e) {
    const error = 
    apiResponseHandler.error(response, e);
  }
});

router.patch('/:id', async (request, response) => {
  try {
    let user = await userService.getUser(request.param('id'));

    if (!user) {
      throw new ResourceQueryError();
    }

    user = await userService.updateUser(user, request.body);
    response.json({
      data: user,
    });
  } catch (e) {
    if (e instanceof ResourceQueryError) {
      response.status(404).send({
        error: 'User not found!',
      });
    } else {
      response.send({
        error: 'An unknown error has occured!',
      });
    }
  }
});

export default router;
