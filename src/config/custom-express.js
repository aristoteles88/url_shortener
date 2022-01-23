const express = require("express");

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

const specs = YAML.load("./swagger.yml");

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const rotas = require("../app/rotas/rotas");
const router = express.Router();
rotas(router);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use('/', router);
app.use('/urls', router);
app.use('/urls/byid/:id', router);
app.use('/urls/bydate/:date', router);
// app.use('/:shortener', router);
// app.use('/urls/:id', router);

module.exports = app;