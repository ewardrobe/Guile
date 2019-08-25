import express, { json, Router } from 'express';
const router = Router();
import logger from '../logger/Log';
import { default as AuthenticationService } from '../services/Auth/UserAuthenticationService';
import { apiResponseHandler } from '../http/api-response-handler';
import { ApiRequest, ApiResponse } from '../http';
express().use(json());

router.post('/', async (request: ApiRequest, response: ApiResponse) => {
  try {
    logger.debug(request.body);
    const user = await AuthenticationService.authenticate(request.body);
    const token = await user.generateAuthToken();
    response.header('x-auth-token', token);
    apiResponseHandler.send(response, user);
  } catch (ex) {
    apiResponseHandler.error(response, ex);
  }
});

export default router;
