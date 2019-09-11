const express = require('express');
const cors = require('cors');
const Youch = require('youch');
const { URL } = require('url');

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV === 'development';

    if (this.isDev) {
      // Garante a declaração do .env conforme definido no env.Example
      require('dotenv-safe').config({ allowEmptyValues: true });
    } else {
      require('dotenv').config({ path: '../.env' });
    }

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
    const myURL = new URL(process.env.APP_URL);

    /*
      Em caso do uso do Wrapper IisNode, feita nos ambientes de homologação e
      produção, trata a adição do trecho "node/<Projeto>/src/" durante o dire-
      cionamento das rotas pelo express.
    */
    if (!this.isDev && myURL.pathname !== '/') {
      this.express.use(myURL.pathname, require('./routes'));
    } else {
      this.express.use(require('./routes'));
    }
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV !== 'production') {
        // Trata erro para apresentação em JSON
        const errYouch = new Youch(err, req);
        return res.json(await errYouch.toJSON());
      }
      return res.status(err.status || 500).json({
        message:
          'Erro interno do servidor, por favor, tente novamente mais tarde',
      });
    });
  }
}

module.exports = new App().express;
