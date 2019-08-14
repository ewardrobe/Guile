import mongoose, { connect, Model, SchemaDefinition, MongooseDocument } from 'mongoose';
import { default as logger, LogInterface }  from '../logger/Log';
import { get as _get } from 'config';
const host = _get('database.host');
const database = _get('database.name');

console.log(`mongodb://${host}/${database}`);
mongoose.connect(`mongodb://${host}/${database}`)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log('DB Failed!'));

export default class DbWrapper {
    protected logger: LogInterface;
    protected mongoose: mongoose.Mongoose;
    protected model: mongoose.Model<mongoose.Document, {}> | null;
    protected schema: mongoose.Schema | null;
    name: string | null;
    constructor(mongoose: mongoose.Mongoose, logger: LogInterface) {
        this.logger = logger;
        this.mongoose = mongoose;
        this.model = null;
        this.schema = null;
        this.name = null;
    }

    setup(schema: any, name: string) {

        if (typeof name === 'undefined' || !name) {
            throw new Error('name cannot be empty on setup!');
        }

        if (typeof schema === 'undefined' || !schema) {
            throw new Error('schema cannot be empty on setup!');
        }

        this.logger.info('Setup completed!');
        this.schema = new this.mongoose.Schema(schema);
        this.model = this.mongoose.model(name, this.schema);
        this.name = name;

    }

    async create(object: Object) {
        try {
            if (this.model === null) {
                throw new Error('Model cannot be null!');
            }

            let entity = new this.model(object);
            return  entity.save(object);
            
        } catch (e) {
            this.logger.error(e.message);
        }
    }

    async read(id: Number) {
        try {
            if (this.model === null) {
                throw new Error('Model cannot be null!');
            }

            await this.model.find(id);
        } catch (e) {
            this.logger.error(e);
        }
    }

    async get(query = <any>{}) {
        try {
            let logger = this.logger;
            let config = <any>{};

            if (this.model === null) {
                throw new Error('Model cannot be null!');
            }
        
            if (typeof query.limit !== "undefined") {
                config.limit = query.limit;
                delete query.limit;
            }

            if (typeof query.offset !== "undefined") {
                config.skip = query.offset;
                delete query.offset;
            }

            return await this.model.find(query, null, config);
        } catch (e) {
            this.logger.error(e.message);
        }
    }

    async update(id: Number) {
        try {
            if (this.model === null) {
                throw new Error('Model cannot be null!');
            }

            return await this.model.find(id);
        } catch (e) {
            this.logger.error(e.message);
        }
    }
}

export const db = mongoose;

