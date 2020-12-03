const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    movie: {
        type: Schema.ObjectId,
        ref: 'Movie',
    },
    room: {
        type: Schema.ObjectId,
        ref: 'Room',
    },
    schedule: {
        type: Schema.ObjectId,
        ref: 'Schedule',
    },
    date: Date,
});

const model = mongoose.model('Programation', mySchema);

module.exports = model;