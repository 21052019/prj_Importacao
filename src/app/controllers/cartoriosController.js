const bdSQL = require('../database/querySql/cartorios');

module.exports = {
  async cadastro(req, res) {
    try {
      /* Lógica de negócio do Will */
      return res.json({ status: 'OK', statusCode: 0 });
    } catch (err) {
      console.log('ERRO', err);
      return res.status(400).json({
        message:
          'Erro interno do servidor, por favor, tente novamente mais tarde',
      });
    }
  },
};
