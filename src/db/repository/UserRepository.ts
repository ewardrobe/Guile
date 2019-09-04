import {EntityRepository, MongoRepository, ObjectID} from "typeorm";
import {User} from "../entity/User";
import _ from 'underscore';

@EntityRepository(User)
export class UserRepository extends MongoRepository<User> {

    async findOneById(id: string): Promise<User> {
        return this.filterUser(await this.findOne(id));
    }

    async findOneByUsername(username: string): Promise<User> {
        return this.filterUser(await this.findOne({ username }));
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.filterUser(await this.findOne({ email }));
    }

    async findOneByName(firstName: string, lastName: string): Promise<User> {
        return this.findOne({ firstName, lastName });
    }

    filterUser(user: User): User {
        return _.omit(user, 'password');
    }

}