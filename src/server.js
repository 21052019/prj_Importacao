const express = require('express');
const cors = require('cors');
const Youch = require('youch');
const dotEnv = require('dotenv')

class App {
  constructor() {
    this.express = express();

    //Biblioteca de leitura para o .env
    dotEnv.config();

    this.middlewares();
    this.security();
    this.routes();
    this.exception();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
  }

  security() {
    this.express.disable('x-powered-by');
    this.express.disable('etag');
  }

  routes() {
    this.express.use(require('./routes'));
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
    // Trata erro para apresentação em JSON
    const errYouch = new Youch(err, req);
    return res.json(await errYouch.toJSON());
    });
  }
}

module.exports = new App().express;
