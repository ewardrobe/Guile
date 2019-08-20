import express, { Router, json } from 'express';
const router = Router();
import logger from '../logger/Log';
import { default as userService, UserService } from '../services/UserService';
import { LookupError } from '../exception';
import { string } from '@hapi/joi';
express().use(json());

router.get('/', async (request, response) => {
  console.log(request.body);
  const users = await userService.getUsers(request.body);
  logger.info(users);
  response.json({
    data: users,
  });
});

router.post('/', async (request, response) => {
  try {
    logger.debug(request.body);
    const user = await userService.createUser(request.body);
    logger.debug(user.username);
    response.send({
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
