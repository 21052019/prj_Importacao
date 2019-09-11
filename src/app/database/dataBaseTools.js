const sql = require('mssql')
class DataBase {
  constructor () {
    this._config =
      process.env.NODE_ENV === 'production'
        ? {
          user: process.env.U_P,
          password: process.env.PW_P,
          server: process.env.SERVER_P,
          database: process.env.DB_P
        }
        : {
          user: process.env.U_H,
          password: process.env.PW_H,
          server: process.env.SERVER_H,
          database: process.env.DB_H
        }
  }

  mudaErroParaObjetoJS({originalError :{info:{number, message}}}){
    return { status: 'Erro', type:'DB', statusCode: number, message }
  }

  executarQuery (queryString) {
    return new Promise(async (resolve, reject) => {
      const conn = new sql.ConnectionPool(this._config)
      conn
        .connect()
        .then(() => {
          const request = new sql.Request(conn)
          request
            .query(queryString)
            .then(response => {
              conn.close()
             return resolve(response)
            })
            .catch(err => {
              conn.close()
              return reject(err)
            })
        })
        .catch(err => {
          conn.close()
         return reject(err)
        })
    })
  }
}
module.exports = new DataBase()
