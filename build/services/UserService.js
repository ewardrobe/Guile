var user_1 = require('../db/user');
var Log_1 = require('../logger/Log');
Log_1.default.info('User Service init');
var UserService = (function () {
    function UserService(userDb, logger) {
        this.async = getUsers(query, {});
        this.userDb = userDb;
        this.logger = logger;
    }
    UserService.prototype.getUser = function (id) {
        this.userDb;
    };
    return UserService;
})();
exports.UserService = UserService;
{
    try {
        query = query || {};
        return await;
        this.userDb.get(query);
    }
    catch (e) {
        this.logger.error(e);
    }
}
async;
addUser(user, any);
{
    try {
        if (Array.isArray(user)) {
        }
        return this.userDb.create(user);
    }
    catch (e) {
        this.logger.error(e.message);
    }
}
var userService = new UserService(user_1.default, Log_1.default);
exports.default = userService;
