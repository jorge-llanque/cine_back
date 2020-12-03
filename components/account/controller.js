const jwt = require('jsonwebtoken');
const store = require('./store');
const bcrypt = require('bcrypt');
const { privateKey } = require('../../config');

function getUsers() {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    })
}

function addUser(user, password) {
    return new Promise((resolve, reject) => {
        if (!user || !password) {
            console.error('[messageController] No hay user o password');
            reject('Los datos son incorrectos');
            return false;
        }

        //Esta validacion lo haré en un middleware :-(
        /* async(user) => {
            let existeUsuario = await store.buscarUser(user);
            if (existeUsuario) {
                console.error('[messageController] Usuario ya existe en la BD')
                reject('Usuario ya existe en la BD');
            }
        } */

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = {
            user: user,
            password: hash,
            date: new Date()
        }

        store.add(newUser);

        let jwtToken = jwt.sign({ _id: newUser._id, user: newUser.user }, privateKey);


        const userDevuelto = {
            user: newUser.user,
            token: jwtToken
        }
        resolve(userDevuelto);
    })
}

module.exports = {
    getUsers,
    addUser
}