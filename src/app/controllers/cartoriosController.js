const lerExcel = require('read-excel-file/node');
const bdSQL = require('../database/querySql/cartorios');

module.exports = {
  async cadastro(req, res) {
    try {
      let objCartorio = {};

      lerExcel(process.env.ARQUIVO_RAIZ).then((cartorios) => {
        const [primeiro, ...restante] = cartorios;

        for (cartorio of restante) {
          objCartorio = linhaParaObj(cartorio);
          if (validarObj(objCartorio)) {
            /*Tirar */console.log(objCartorio);

            importaObjParaBD(objCartorio);
          } else {
            /* Criar log */
            console.log('Registro inválido:', objCartorio);
          }
        }
      });
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

const linhaParaObj = (cartorio) => ({
  estado: cartorio[0],
  comarca: cartorio[1],
  cidade: cartorio[2],
  nome: cartorio[3],
  cnpj: cartorio[4],
  oficial: cartorio[5],
  tipo: cartorio[6],
  logradouro: cartorio[7],
  numero: cartorio[8],
  complemento: cartorio[9],
  bairro: cartorio[10],
  cep: cartorio[11],
  email: cartorio[12],
  ddd: cartorio[13],
  telefone: cartorio[14],
  banco: cartorio[15],
  correntista: cartorio[16],
  agencia: cartorio[17],
  conta: cartorio[18],
  cobrado: cartorio[19],
  percentual: cartorio[20],
});

const validarObj = (objCartorio) => {
  if (!objCartorio.estado) return false;
  // Adicionar validações quanto aos tipagens de cada coluna correspondente das tabelas.

  if (!objCartorio.comarca) return false;

  if (!objCartorio.cidade) return false;

  if (!objCartorio.nome) return false;

  if (!objCartorio.cnpj) return false;

  if (!objCartorio.oficial) return false;

  if (!objCartorio.tipo) return false;

  if (!objCartorio.logradouro) return false;

  if (!objCartorio.numero) return false;

  if (!objCartorio.bairro) return false;

  if (!objCartorio.cep) return false;

  if (!objCartorio.email) return false;

  if (!objCartorio.ddd) return false;

  if (!objCartorio.telefone) return false;
  return true;
};

const importaObjParaBD = (objCartorio) => {
  // console.log(objCartorio);
};
