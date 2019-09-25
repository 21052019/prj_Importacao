const express = require('express');

const routes = express.Router();
const ctrCartorios = require('./app/controllers/cartoriosController');

routes.post('/cadastrar', ctrCartorios.cadastro);
routes.post('/cadastrarcidade', ctrCartorios.cadastroCidade);

module.exports = routes;
