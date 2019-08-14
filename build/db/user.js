var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mongoose_1 = require('../wrapper/mongoose');
var Log_1 = require('../logger/Log');
var UserDb = (function (_super) {
    __extends(UserDb, _super);
    function UserDb(mongoose, logger) {
        _super.call(this, mongoose, logger);
        var schema = {
            username: {
                type: String,
                unique: true,
                required: true,
                dropDups: true
            },
            forename: {
                type: String,
                minlength: 3
            },
            surename: {
                type: String,
                minlength: 3
            },
            status: {
                type: String,
                required: true,
                enum: []
            },
            email: {
                type: String,
                unique: true,
                required: true,
                dropDups: true
            },
        };
        var name = 'User';
        this.setup(schema, name);
    }
    return UserDb;
})(mongoose_1.default);
exports.UserDb = UserDb;
Log_1.default.info('USER Db created');
var User = new UserDb(mongoose_1.db, Log_1.default);
exports.default = User;
