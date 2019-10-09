const express = require('express');

const routes = express.Router();
const ctrCartorios = require('./app/controllers/cartoriosController');

routes.post('/cadastrar/:idEstado', ctrCartorios.cadastro);
routes.post('/cadastrarcidade/:idEstado', ctrCartorios.cadastroCidade);
// routes.post('/cadastrardepartamento', ctrCartorios.cadastroDepartamento);
routes.post('/dep2/:idEstado', ctrCartorios.Dep2);
module.exports = routes;
