const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const store = require('./store');
const response = require('../../network/response');

const router = express.Router();

router.post('/', async(req, res) => {
    let user = await store.buscarUser(req.body.user)
    if (!user) return res.status(400).send('Usuario o contraseña incorrectos');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Usuario o contraseña incorrectos');

    const jwtToken = user.generateJWT();
    // res.send(jwtToken);

    let infoUser = {
        user: user.user,
        token: jwtToken
    }
    response.registerUser(req, res, infoUser, 201);
});

module.exports = router