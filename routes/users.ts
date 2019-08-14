import express, { Router, json } from 'express';
const app = express();
const router = Router();
import Logger from '../logger/Log';
import { default as userService, UserService } from '../services/UserService';
app.use(json());

router.get('/', async (request, response) => {
    let users = await userService.getUser(request.body);
    response.json({
        data: users
    });
});

router.post('/', async (request, response) => {
    try {
        const user = await userService.addUser(request.body);
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