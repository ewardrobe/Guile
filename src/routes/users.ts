import express, { Router, json } from 'express';
const router = Router();
import logger from '../logger/Log';
import { createRequestValidator } from "../validator/user";
import { default as userService, UserService } from '../services/UserService';
express().use(json());


router.get('/', async (request, response) => {
    console.log(request.body);
    let users = await userService.getUsers(request.body);
    logger.info(users);
    response.json({
        data: users
    });
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
        let user = await userService.updateUser(request.param('id'), request.body);
        logger.info('get User by id');
        response.json({
            data: user
        });
    } catch (e) {
        logger.error(e.message);
    }
});

export default router;