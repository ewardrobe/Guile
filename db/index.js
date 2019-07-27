const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const host = config.get('database.host');
const database = config.get('database.name');

console.log(`mongodb://${host}/${database}`);
mongoose.connect(`mongodb://${host}/${database}`)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log('DB Failed!'));

module.exports = mongoose;