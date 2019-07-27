const mongoose = require('../db');

const AddressSchema = new mongoose.Schema({
    addressLine1: String,
    addressLine2: String,
    county: String,
    country: String
});