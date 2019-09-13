const lerExcel = require('read-excel-file/node');
const bdSQL = require('../database/querySql/cartorios');

const cartoriosInvalidos = [];

module.exports = {
  async cadastro(req, res) {
    try {
      let objCartorio = {};

      lerExcel(process.env.ARQUIVO_RAIZ).then(async (cartorios) => {
        const [primeiro, ...restante] = cartorios;

        for (cartorio of restante) {
          objCartorio = await linhaParaObj(cartorio);
          if (validarObj(objCartorio)) {
            importaObjParaBD(objCartorio);
          } else {
            cartoriosInvalidos.push(objCartorio);
          }
        }

        return res.json({ status: 'OK', statusCode: 0, invalidos: cartoriosInvalidos });
      });
    } catch (err) {
      console.log('ERRO', err);
      return res.status(400).json({
        message:
          'Erro interno do servidor, por favor, tente novamente mais tarde',
      });
    }
  },
};

const linhaParaObj = async (cartorio) => {
  const IDvia = await bdSQL.dbbuscaIdVia(cartorio[7]);
  const IDcidade = await bdSQL.dbbuscaIdCidade(cartorio[2]);

  return ({
    estado: cartorio[0],
    comarca: cartorio[1],
    IDcidade,
    cidade: cartorio[2],
    nCartorio: cartorio[3],
    razao: cartorio[4],
    cnpj: cartorio[5],
    nomeOficial: cartorio[6],
    cns: null,
    ipCartorio: null,
    IDvia,
    observacoes: null,
    horariofunc: null,
    via: cartorio[7],
    logradouro: cartorio[8],
    numero: cartorio[9],
    complemento: cartorio[10],
    bairro: cartorio[11],
    cep: cartorio[12],
    emailOficial: cartorio[13],
    dddTelefone: cartorio[14],
    telefone: cartorio[15],
    dddfax: null,
    fax: null,
    site: null,
    nrBanco: (cartorio[16] || ''),
    favorecido: (cartorio[17] || ''),
    nrAgencia: (cartorio[18] || ''),
    nrAgenciaDigito: cartorio[18],
    nrContaCorrente: (cartorio[19] || ''),
    nrContaCorrenteDigito: null,
    cobrado: cartorio[20],
    percentual: cartorio[21],
    bsrNrBanco: null,
    bsrNraAgencia: null,
    bsrNrContaCorrente: null,
    bsrNrCarteira: null,
    emailAdministrativo: null,
    emailFinanceiro: null,
    blnPesquisa: null,
    blnParticipaCE: 0,
    blnCertidao: null,
    blnLimitarCertidaoDigital: null,
    blnParticipaVM: null,
    blnManutencaoVM: null,
    blnParticipaMR: null,
    blnGeraBoletoSemRegistroAC: null,
    blnGeraBoletoSemRegistroPenhora: null,
    blnParticipaAC: null,
    blnGeraBoletoIN: 0,
    blnParticipaIN: null,
    convenioBanco: null,
    blnMUPAC: null,
    blnMUPIN: null,
    blnMUPPenhora: null,
    blnSPSAC: null,
    blnSPSIN: null,
    blnSPSPenhora: null,
    nrCedente: null,
    favorecidoCPFCNPJ: null,
    blnDesativado: 1,
    blnBDL: null,
    blnParticipaPP: false,
    blnPECCertidaoDigital: false,
  });
};

const validarObj = (objCartorio) => {
  if (!objCartorio.estado) return false;
  // Adicionar validações quanto aos tipagens de cada coluna correspondente das tabelas.

  if (!objCartorio.comarca) return false;

  if (!objCartorio.cidade) return false;

  if (!objCartorio.razao) return false;

  if (!objCartorio.cnpj) return false;

  if (!objCartorio.nomeOficial) return false;

  if (!objCartorio.via) return false;

  if (!objCartorio.logradouro) return false;

  if (!objCartorio.numero) return false;

  if (!objCartorio.bairro) return false;

  if (!objCartorio.cep) return false;

  if (!objCartorio.emailOficial) return false;

  if (!objCartorio.dddTelefone) return false;

  if (!objCartorio.telefone) return false;
  return true;
};

const importaObjParaBD = (objCartorio) => {
  bdSQL.dbCadastrar(objCartorio)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      cartoriosInvalidos.push(objCartorio);
      console.log(error);
    });
};
