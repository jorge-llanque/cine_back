const express = require('express');

const app = express();
const server = require('http').Server(app);

const config = require('./config');

const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./network/routes');
const db = require('./db');

db(config.dbUrl);

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router(app);




app.use(config.publicRoute, express.static('public'));

server.listen(config.port, function() {
    console.log(`La aplicación esta escuchando en ${config.host}:${config.port}`);
})