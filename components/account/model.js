const { Mongoose } = require("mongoose");
const { privateKey } = require('../../config');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean,
    role: String,
    date: Date,

}, {
    /* timestamp:true */
});

mySchema.methods.generateJWT = function() {
    return jwtToken = jwt.sign({
        _id: this._id,
        user: this.user,
        isAdmin: this.isAdmin,
        role: this.role
    }, privateKey);
}

const model = mongoose.model('accout', mySchema);

module.exports = model;