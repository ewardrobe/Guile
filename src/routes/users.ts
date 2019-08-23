import express, { json, Router } from 'express';
const router = Router();
import { LookupError } from '../exception';
import logger from '../logger/Log';
import { default as userService } from '../services/UserService';
import { User } from '../db/entity/User';
express().use(json());

router.get('/', async (request, response) => {
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
    response.header('x-auth-token', token).send({
      data: user,
    });
  } catch (e) {
    logger.error(e);
    response.send({
      error: e.message,
    });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const user = await userService.getUser(request.param('id'));
    logger.info('get User by id');
    logger.debug(user);
    response.json({
      data: user,
    });
  } catch (e) {
    logger.error(e.message);
  }
});

router.patch('/:id', async (request, response) => {
  try {
    let user = await userService.getUser(request.param('id'));

    if (!user) {
      throw new LookupError();
    }

    user = await userService.updateUser(user, request.body);
    response.json({
      data: user,
    });
  } catch (e) {
    if (e instanceof LookupError) {
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
