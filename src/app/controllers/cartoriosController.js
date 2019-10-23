const lerExcel = require('read-excel-file/node');
const bdSQL = require('../database/querySql/cartorios');

let cartoriosInvalidos = [];
let cidadesInvalidas = [];
let errosDepartamento = [];

module.exports = {
  async cadastro(req, res) {
    const {idEstado} = req.params;
    limparRegistros();
    try {
      let objCartorio = {};

      lerExcel(process.env.ARQUIVO_RAIZ).then(async (cartorios) => {
        const [primeiro, ...restante] = cartorios;

        for (cartorio of restante) {
          objCartorio = await _linhaParaObj(cartorio, idEstado);
          if (_validarObj(objCartorio)) {
            _importaObjParaBD(objCartorio);
          } else {
            cartoriosInvalidos.push(objCartorio);
          }
        }
        return res.json({ status: 'OK', statusCode: 0, invalidos: cartoriosInvalidos, errosDepartamento });
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
    const {idEstado} = req.params;

    limparRegistros();
    try {
      const objCartorio = {};

      lerExcel(process.env.ARQUIVO_RAIZ).then(async (cartorios) => {
        const [primeiro, ...restante] = cartorios;

        for (cartorio of restante) {
          objCartorio.cidade = await _linhaParaObj(cartorio);
          if (_validarObjCidade(objCartorio.cidade)) {
            _importaObjCidadeParaBD(objCartorio.cidade, idEstado);
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
  async cadastroDepartamento(req, res){
    limparRegistros();
    try {
      for (cartorio of req.body) {
        if (_validarObj(cartorio)) {
          _importaDepartamentoParaBD (cartorio,cartorio.IDInstituicao)
        } else {
          cartoriosInvalidos.push(cartorio);
        }
      }
      return res.json({ status: 'OK', statusCode: 0, invalidos: cartoriosInvalidos, errosDepartamento });
    } catch (err) {
      console.log('ERRO', err);
      return res.status(400).json({
        message:
          'Erro interno do servidor, por favor, tente novamente mais tarde',
      });
    }
  },
  async Dep2(req, res) {
    const {idEstado} = req.params;
    const dep  = [];

    limparRegistros();
    try {
      let objCartorio = {};
      lerExcel(process.env.ARQUIVO_RAIZ).then(async (cartorios) => {
        const [primeiro, ...restante] = cartorios;

        for (cartorio of restante) {
          objCartorio = await _linhaParaObj(cartorio, idEstado);
          bdSQL.dbbuscaIDInstituicao(objCartorio).then((IDInstituicao)=>{
            dep.push({...objCartorio, IDInstituicao });
          })
        }

        for (cartorio of dep) {
          if (_validarObj(cartorio)) {
            _importaDepartamentoParaBD (cartorio,cartorio.IDInstituicao)
          } else {
            cartoriosInvalidos.push(cartorio);
          }
        }

        return res.json({ status: 'OK', statusCode: 0, invalidos: cartoriosInvalidos, errosDepartamento });
      });
    } catch (err) {
      console.log('ERRO', err);
      return res.status(400).json({
        message:
          'Erro interno do servidor, por favor, tente novamente mais tarde',
      });
    }
  }
};

const limparRegistros=()=>{
  cartoriosInvalidos = [];
  cidadesInvalidas = [];
  errosDepartamento = [];
};

const _linhaParaObj = async (cartorio, idEstado) => {
  const IDvia = await bdSQL.dbbuscaIdVia(cartorio[8]);
  const IDcidade = await bdSQL.dbbuscaIdCidade(cartorio[2], idEstado);

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
    numero: cartorio[10] === '0' ? cartorio[10] : ' ',
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
    blnPECCertidaoDigital: false
  });
};

const _validarObj = (objCartorio) => {
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

  return true;
};

const _validarObjCidade = (objCartorio) => {
  if (!objCartorio.cidade) {
    return false;
  }
  return true;
};

const _importaObjParaBD = (objCartorio) => {
  bdSQL.dbCadastrarCartorio(objCartorio)
    .then((resCartorio) => {
      _importaDepartamentoParaBD(objCartorio,resCartorio[0].ID)
    })
    .catch((error) => {
      cartoriosInvalidos.push(objCartorio);
      console.log(error);
    });
};
const _importaObjCidadeParaBD = (objCartorio,idEstado) => {
  bdSQL.dbCadastrarCidade(objCartorio, idEstado)
    .catch((error) => {
      cidadesInvalidas.push(objCartorio);
      console.log(error);
    });
};
const _importaDepartamentoParaBD = (objCartorio,IDInstituicao) => {
  bdSQL.dbCadastrarDepartamento(objCartorio, IDInstituicao)
    .catch((error) => {
      errosDepartamento.push({...objCartorio, IDInstituicao});
      console.log(error);
    });
};
