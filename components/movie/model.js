const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    title: {
        type: String
    },
    format: [String],
    casting: [String],
    released: {
        type: String
    },
    lenguage: [String],
    genre: [String],
    summary: String,
    posterImage: String,
    coverImage: String,
    date: Date,
});

const model = mongoose.model('Movie', mySchema);

module.exports = model;