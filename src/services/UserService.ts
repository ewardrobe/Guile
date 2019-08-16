
import Logger, { default as logger, LogInterface }  from '../logger/Log';
import { User } from '../db/entity/User';
import { eWardobeDb } from '../db/connect';
import { Connection } from 'typeorm';

async function test() {
    try {
        let user = User.create({
            firstName: "peter",
            lastName: "atkins",
            dateOfBirth: "1985-08-24"
        });
        User.save(user);
        logger.info('What the hell is hapening ');
    } catch (e) {
        logger.error(e);
    }
}

test();
logger.info('User Service init');

export class UserService {
   
}

