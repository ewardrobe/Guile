import express, { json, Router } from 'express';
const router = Router();
import logger from '../logger/Log';
import { default as AuthenticationService } from '../services/Auth/UserAuthenticationService';
import { apiResponseHandler } from '../http/api-response-handler';
import { AppRequest, AppResponse } from '../http';
express().use(json());

router.post('/', async (request: AppRequest, response: AppResponse) => {
    logger.debug(request.body);
    const user = await AuthenticationService.authenticate(request.body);
    const token = await user.generateAuthToken();
    response.send({ 
        token: token
     });
});

export default router;
