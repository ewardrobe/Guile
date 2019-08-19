import express, { Router, json } from 'express';
const router = Router();
import logger from '../logger/Log';
import { default as userService, UserService } from '../services/UserService';
import { registrationValidator } from '../validator/user';
express().use(json());

router.get('/', async (request, response) => {
    console.log(request.body);
    let users = await userService.getUsers(request.body);
    logger.info(users);
    response.json({
        data: users
    });
});


router.post('/register', async (request, response) => {
    try {
        logger.debug(request.body);
        await registrationValidator.validate(request.body);
        let user = await userService.createUser(request.body);
        logger.debug(user.username);
        response.send({
            data: user
        });
    } catch (e) {
        logger.error(e);
        response.send({
            error: e.message
        });
    }
});

router.post('/', async (request, response) => {
    try {
        logger.debug(request.body);
        let user = await userService.createUser(request.body);
        logger.debug(user.username);
        response.send({
            data: user
        });
    } catch (e) {
        logger.error(e);
        response.send({
            error: e.message
        });
    }
});

router.get('/:id', async (request, response) => {
    try {
        let user = await userService.getUser(request.param('id'));
        logger.info('get User by id');
        response.json({
            data: user
        });
    } catch (e) {
        logger.error(e.message);
    }
});

router.patch('/:id', async (request, response) => {
    try {
        let user = await userService.getUser(request.param("id"));

        if (!user) {
            response.status(404).send('User not found!');
        }

        user = await userService.updateUser(user, request.body);
        response.json({
            data: user
        });
    } catch (e) {
        response.json({
            error: e.message
        });
    }
});

export default router;