const lerExcel = require('read-excel-file/node');
const bdSQL = require('../database/querySql/cartorios');

const cartoriosInvalidos = [];
const cidadesInvalidas = [];

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
  async cadastroCidade(req, res) {
    try {
      const objCartorio = {};

      lerExcel(process.env.ARQUIVO_RAIZ).then(async (cartorios) => {
        const [primeiro, ...restante] = cartorios;

        for (cartorio of restante) {
          objCartorio.cidade = await linhaParaObj(cartorio);
          if (validarObjCidade(objCartorio.cidade)) {
            importaObjCidadeParaBD(objCartorio.cidade);
          } else {
            cidadesInvalidas.push(objCartorio.cidade);
          }
        }

        return res.json({ status: 'OK', statusCode: 0, invalidos: cidadesInvalidas });
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
  const IDvia = await bdSQL.dbbuscaIdVia(cartorio[8]);
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
    cns: cartorio[7],
    ipCartorio: null,
    IDvia,
    observacoes: null,
    horariofunc: null,
    via: cartorio[8],
    logradouro: cartorio[9],
    numero: cartorio[10] !== null ? cartorio[10] : 'S/N',
    complemento: cartorio[11],
    bairro: cartorio[12],
    cep: cartorio[13],
    emailOficial: cartorio[14],
    dddTelefone: cartorio[15],
    telefone: cartorio[16],
    dddfax: null,
    fax: null,
    site: null,
    nrBanco: (cartorio[17] || ''),
    favorecido: (cartorio[18] || ''),
    nrAgencia: (cartorio[19] || ''),
    nrAgenciaDigito: cartorio[20] !== null ? cartorio[20] : '',
    nrContaCorrente: (cartorio[21] || ''),
    nrContaCorrenteDigito: (cartorio[22] || ''),
    cobrado: cartorio[23],
    percentual: cartorio[24],
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
  if (!objCartorio.estado) {
    return false;
  }
  // Adicionar validações quanto aos tipagens de cada coluna correspondente das tabelas.

  if (!objCartorio.comarca) {
    return false;
  }

  if (!objCartorio.cidade) {
    return false;
  }

  if (!objCartorio.razao) {
    return false;
  }

  if (!objCartorio.cnpj) {
    return false;
  }

  if (!objCartorio.nomeOficial) {
    return false;
  }

  if (!objCartorio.cns) {
    return false;
  }

  if (!objCartorio.via) {
    return false;
  }

  if (!objCartorio.logradouro) {
    return false;
  }

  if (!objCartorio.numero) {
    return false;
  }

  if (!objCartorio.bairro) {
    return false;
  }

  if (!objCartorio.cep) {
    return false;
  }

  if (!objCartorio.emailOficial) {
    return false;
  }

  if (!objCartorio.dddTelefone) {
    return false;
  }

  if (!objCartorio.telefone) {
    return false;
  }

  if (!objCartorio.nrBanco) {
    return false;
  }

  if (!objCartorio.favorecido) {
    return false;
  }

  if (!objCartorio.nrAgencia) {
    return false;
  }

  if (!objCartorio.nrContaCorrente) {
    return false;
  }
  return true;
};

const validarObjCidade = (objCartorio) => {
  if (!objCartorio.cidade) {
    return false;
  }
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
const importaObjCidadeParaBD = (objCartorio) => {
  bdSQL.dbCadastrarCidade(objCartorio)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      cidadesInvalidas.push(objCartorio);
      console.log(error);
    });
};
