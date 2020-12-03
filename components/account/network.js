const jwt = require('jsonwebtoken');
const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    controller.getUsers()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.post('/', (req, res) => {
    controller.addUser(req.body.user, req.body.password)
        .then((userDevuelto) => {
            response.registerUser(req, res, userDevuelto, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 404, e);
        })
});

module.exports = router;