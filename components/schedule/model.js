const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: Date,
});

const model = mongoose.model('Schedule', mySchema);

module.exports = model;