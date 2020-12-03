const jwt = require('jsonwebtoken');
const { privateKey } = require('../config');

function auth(req, res, next) {
    const jwtToken = req.header('Authorization');
    if (!jwtToken) return res.status(401).send('Acceso Denegado. Necesitamos un token')

    try {
        const payload = jwt.verify(jwtToken, privateKey)
        req.user = payload
        next()
    } catch (error) {
        res.status(400).send('Acceso Denegado. Token no valido')
    }
}

module.exports = auth