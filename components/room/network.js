const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    controller.getRooms()
        .then(room => {
            response.success(req, res, room, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.post('/', (req, res) => {
    controller.addRoom(req.body.name, req.body.capacity)
        .then(room => {
            response.success(req, res, room, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400, e);
        })
});

router.put('/:id', (req, res) => {
    controller.updateRoom(req.params.id, req.body.name, req.body.capacity)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

router.delete('/:id', (req, res) => {
    controller.deleteRoom(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;