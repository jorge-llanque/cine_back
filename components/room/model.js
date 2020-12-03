const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    capacity: Number,
    date: Date
});

const model = mongoose.model('Room', mySchema);

module.exports = model;