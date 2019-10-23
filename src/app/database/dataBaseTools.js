const sql = require('mssql');

class DataBase {
  constructor() {
    switch(process.env.AMBIENTE){
      case 'prod':
        this.config = {
          user: process.env.U_P,
          password: process.env.PW_P,
          server: process.env.SERVER_P,
          database: process.env.DB_P,
        };
        break;
      case 'pre':
        this.config = {
          user: process.env.U_PP,
          password: process.env.PW_PP,
          server: process.env.SERVER_PP,
          database: process.env.DB_PP,
        };
        break;
      default:
        this.config = {
          user: process.env.U_H,
          password: process.env.PW_H,
          server: process.env.SERVER_H,
          database: process.env.DB_H,
        };
    }
  }

  static mudaErroParaObjetoJS({ originalError: { info: { number, message } } }) {
    return {
      status: 'Erro', type: 'DB', statusCode: number, message,
    };
  }

  executarQuery(queryString) {
    return new Promise((resolve, reject) => {
      const conn = new sql.ConnectionPool(this.config);
      conn
        .connect()
        .then(() => {
          const request = new sql.Request(conn);
          request
            .query(queryString)
            .then((response) => {
              conn.close();
              return resolve(response);
            })
            .catch((err) => {
              conn.close();
              return reject(err);
            });
        })
        .catch((err) => {
          conn.close();
          return reject(err);
        });
    });
  }

  executarProcedure(procedure, inputs = [], outputs = []) {
    return new Promise((resolve, reject) => {
      const conn = new sql.ConnectionPool(this.config);
      conn
        .connect()
        .then(() => {
          const request = new sql.Request(conn);

          for (const { nome, tipo, valor } of inputs) {
            request.input(nome, tipo, valor);
          }

          for (const { nome, tipo } of outputs) {
            request.output(nome, tipo);
          }

          request
            .execute(procedure)
            .then((response) => {
              sql.close();
              return resolve(response);
            })
            .catch((err) => {
              sql.close();
              return reject(err);
            });
        })
        .catch((err) => {
          conn.close();
          return reject(err);
        });
    });
  }
}
module.exports = new DataBase();
