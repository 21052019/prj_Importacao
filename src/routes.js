const express = require("express");
const routes = express.Router();
const ctrCartorios = require("./app/controllers/cartoriosController");

routes.post("/cadastrar", ctrCartorios.cadastro);

module.exports = routes;
