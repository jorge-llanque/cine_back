const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    controller.getSchedules()
        .then(schedule => {
            response.success(req, res, schedule, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.post('/', (req, res) => {
    controller.addSchedule(req.body.day, req.body.time)
        .then(schedule => {
            response.success(req, res, schedule, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400, e);
        })
});

router.put('/:id', (req, res) => {
    controller.updateSchedule(req.params.id, req.body.day, req.body.time)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

router.delete('/:id', (req, res) => {
    controller.deleteSchedule(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;