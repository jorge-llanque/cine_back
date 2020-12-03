const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user);
    myUser.save();
}

function getUsers() {
    return Model.find();
}

function buscarUser(user) {
    return Model.findOne({ user: user }).exec();
}

module.exports = {
    add: addUser,
    list: getUsers,
    buscarUser
}