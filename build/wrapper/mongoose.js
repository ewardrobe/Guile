var mongoose_1 = require('mongoose');
var config_1 = require('config');
var host = config_1.get('database.host');
var database = config_1.get('database.name');
console.log("mongodb://" + host + "/" + database);
mongoose_1.connect("mongodb://" + host + "/" + database)
    .then(function () { return console.log('DB Connected'); })
    .catch(function (err) { return console.log('DB Failed!'); });
var DbWrapper = (function () {
    function DbWrapper(mongoose, logger) {
        this.model = null;
        this.schema = null;
        this.name = null;
        this.async = create(object, Object);
        this.logger = logger;
        this.mongoose = mongoose;
        this.model = null;
        this.schema = null;
        this.name = null;
    }
    DbWrapper.prototype.setup = function (schema, name) {
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
    };
    return DbWrapper;
})();
exports.default = DbWrapper;
{
    try {
        if (this.model === null) {
            throw new Error('Model cannot be null!');
        }
        var entity = new this.model(object);
        return entity.save(object);
    }
    catch (e) {
        this.logger.error(e.message);
    }
}
async;
read(id, Number);
{
    try {
        if (this.model === null) {
            throw new Error('Model cannot be null!');
        }
        await;
        this.model.find(id);
    }
    catch (e) {
        this.logger.error(e);
    }
}
async;
get(query = {});
{
    try {
        var logger_1 = this.logger;
        var config = {};
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
        return await;
        this.model.find(query, null, config);
    }
    catch (e) {
        this.logger.error(e.message);
    }
}
async;
update(id, Number);
{
    try {
        if (this.model === null) {
            throw new Error('Model cannot be null!');
        }
        return await;
        this.model.find(id);
    }
    catch (e) {
        this.logger.error(e.message);
    }
}
exports.db = mongoose_1.default;
