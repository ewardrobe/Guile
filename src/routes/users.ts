import express, { Router, json } from 'express';
const router = Router();
import Logger from '../logger/Log';
import { default as userService, UserService } from '../services/UserService';
express().use(json());

router.get('/', async (request, response) => {
    let users = await userService.getUsers(request.body);
    Logger.info(users);
    response.json({
        data: users
    });
});

router.post('/', async (request, response) => {
    try {
        let user = await userService.createUser(request.body);
        response.send({
            data: user
        });
    } catch (e) {
        Logger.error(e);
        response.send({
            error: e.message
        });
    }
});

router.get('/:id', async (request, response) => {
    let user = await userService.getUser(request.body.id);
    Logger.info('get User by id');
    response.json({
        data: user
    });
});

export default router;