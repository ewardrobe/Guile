import express, { Router, json } from 'express';
const router = Router();
import Logger from '../logger/Log';
import { default as userService, UserService } from '../services/UserService';
express().use(json());

router.get('/', async (request, response) => {
    //let users = await userService.getUser(request.body);
    let users = [
        {}
    ];
    response.json({
        data: users
    });
});

router.post('/', async (request, response) => {
    try {
        //const user = await userService.addUser(request.body);
        const user = { };
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

router.get('/:id', (req, res) => {
    res.send('Hello Wordddld');
});

export default router;