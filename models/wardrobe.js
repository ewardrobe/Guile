const mongoose = require('../db');

const WardrobeSchema = new mongoose.Schema({
    name: String,
    safeName: { type : String , unique : true, required : true, dropDups: true },
    status: String
});