var debug_1 = require('debug');
var Log = (function () {
    function Log(Debug) {
        this.logger = Debug;
    }
    Log.prototype.debug = function (message) {
        this.logger('app:debug')(message);
    };
    Log.prototype.error = function (message) {
        this.logger('app:error')(message);
    };
    Log.prototype.info = function (message) {
        this.logger('app:info')(message);
    };
    Log.prototype.warn = function (message) {
        this.logger('app:warn')(message);
    };
    return Log;
})();
var Logger = new Log(debug_1.default);
exports.default = Logger;
