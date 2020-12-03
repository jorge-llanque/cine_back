const express = require('express');
const movie = require('../components/movie/network');
const room = require('../components/room/network');
const schedule = require('../components/schedule/network');
const programation = require('../components/programation/network');
const account = require('../components/account/network');
const auth = require('../components/account/auth');

const routes = function(server) {
    server.use('/movie', movie);
    server.use('/room', room);
    server.use('/schedule', schedule);
    server.use('/programation', programation);
    server.use('/account', account);
    server.use('/auth', auth);
}

module.exports = routes;