const sql = require('mssql');
const dataBaseTools = require('../dataBaseTools');

class Cartorios {
  static dbCadastrarCartorio(objCartorio) {
    return new Promise((resolve, reject) => {
      dataBaseTools.executarProcedure('stpCartorios', [
        { nome: 'intOperacao', tipo: sql.Int, valor: 2 },
        { nome: 'intID', tipo: sql.Int, valor: null },
        { nome: 'intTipo', tipo: sql.Int, valor: 1 },
        { nome: 'strRazao', tipo: sql.VarChar(100), valor: objCartorio.razao },
        { nome: 'strCNPJ', tipo: sql.VarChar(14), valor: objCartorio.cnpj },
        { nome: 'intIDCidade', tipo: sql.Int, valor: objCartorio.IDcidade },
        { nome: 'intIDVia', tipo: sql.Int, valor: objCartorio.IDvia },
        { nome: 'strNumCartorio', tipo: sql.VarChar(50), valor: objCartorio.nCartorio },
        { nome: 'strLogradouro', tipo: sql.VarChar(50), valor: objCartorio.logradouro },
        { nome: 'strNumero', tipo: sql.VarChar(6), valor: objCartorio.numero },
        { nome: 'strBairro', tipo: sql.VarChar(50), valor: objCartorio.bairro },
        { nome: 'strCep', tipo: sql.VarChar(10), valor: objCartorio.cep },
        { nome: 'strDDDTelefone', tipo: sql.VarChar(10), valor: objCartorio.dddTelefone },
        { nome: 'strTelefone', tipo: sql.VarChar(50), valor: objCartorio.telefone },
        { nome: 'strDDDFax', tipo: sql.VarChar(50), valor: objCartorio.dddfax },
        { nome: 'strFax', tipo: sql.VarChar, valor: objCartorio.fax },
        { nome: 'strSite', tipo: sql.VarChar, valor: objCartorio.site },
        { nome: 'strEmail', tipo: sql.VarChar, valor: objCartorio.emailOficial },
        { nome: 'strNomeOficial', tipo: sql.VarChar, valor: objCartorio.nomeOficial },
        { nome: 'strCNS', tipo: sql.VarChar, valor: objCartorio.cns },
        { nome: 'strIP', tipo: sql.VarChar, valor: objCartorio.ipCartorio },
        { nome: 'strObservacoes', tipo: sql.VarChar, valor: objCartorio.observacoes },
        { nome: 'HoraFunc', tipo: sql.VarChar, valor: objCartorio.horariofunc },
        { nome: 'strNrBanco', tipo: sql.VarChar, valor: objCartorio.nrBanco },
        { nome: 'strAgencia', tipo: sql.VarChar, valor: objCartorio.nrAgencia },
        { nome: 'strAgenciaDigito', tipo: sql.VarChar, valor: objCartorio.nrAgenciaDigito },
        { nome: 'strContaCorrente', tipo: sql.VarChar, valor: objCartorio.nrContaCorrente },
        { nome: 'strContaCorrenteDigito', tipo: sql.VarChar, valor: objCartorio.nrContaCorrenteDigito },
        { nome: 'strNrBancoBSR', tipo: sql.VarChar, valor: objCartorio.bsrNrBanco },
        { nome: 'strAgenciaBSR', tipo: sql.VarChar, valor: objCartorio.bsrNraAgencia },
        { nome: 'strContaCorrenteBSR', tipo: sql.VarChar, valor: objCartorio.bsrNrContaCorrente },
        { nome: 'strCarteira', tipo: sql.VarChar, valor: objCartorio.bsrNrCarteira },
        { nome: 'strFavorecido', tipo: sql.VarChar, valor: objCartorio.favorecido },
        { nome: 'strEmailAdministrativo', tipo: sql.VarChar, valor: objCartorio.emailAdministrativo },
        { nome: 'strEmailFinanceiro', tipo: sql.VarChar, valor: objCartorio.emailFinanceiro },
        { nome: 'blnPesquisa', tipo: sql.VarChar, valor: objCartorio.blnPesquisa },
        { nome: 'blnParticipaCE', tipo: sql.VarChar, valor: objCartorio.blnParticipaCE },
        { nome: 'blnCertidao', tipo: sql.VarChar, valor: objCartorio.blnCertidao },
        { nome: 'blnLimitarCertidaoDigital', tipo: sql.VarChar, valor: objCartorio.blnLimitarCertidaoDigital },
        { nome: 'blnParticipaVM', tipo: sql.VarChar, valor: objCartorio.blnParticipaVM },
        { nome: 'blnManutencaoVM', tipo: sql.VarChar, valor: objCartorio.blnManutencaoVM },
        { nome: 'blnParticipaMR', tipo: sql.VarChar, valor: objCartorio.blnParticipaMR },
        { nome: 'blnGeraBoletoAC', tipo: sql.VarChar, valor: objCartorio.blnGeraBoletoSemRegistroAC },
        { nome: 'blnGeraBoletoPenhora', tipo: sql.VarChar, valor: objCartorio.blnGeraBoletoSemRegistroPenhora },
        { nome: 'blnParticipaAC', tipo: sql.VarChar, valor: objCartorio.blnParticipaAC },
        { nome: 'EmailOficial', tipo: sql.VarChar, valor: objCartorio.emailOficial },
        { nome: 'blnGeraBoletoIN', tipo: sql.VarChar, valor: objCartorio.blnGeraBoletoIN },
        { nome: 'blnParticipaIN', tipo: sql.VarChar, valor: objCartorio.blnParticipaIN },
        { nome: 'ConvenioBanco', tipo: sql.VarChar, valor: objCartorio.convenioBanco },
        { nome: 'blnMUPAC', tipo: sql.VarChar, valor: objCartorio.blnMUPAC },
        { nome: 'blnMUPIN', tipo: sql.VarChar, valor: objCartorio.blnMUPIN },
        { nome: 'blnMUPPenhora', tipo: sql.VarChar, valor: objCartorio.blnMUPPenhora },
        { nome: 'blnSPSAC', tipo: sql.VarChar, valor: objCartorio.blnSPSAC },
        { nome: 'blnSPSIN', tipo: sql.VarChar, valor: objCartorio.blnSPSIN },
        { nome: 'blnSPSPenhora', tipo: sql.VarChar, valor: objCartorio.blnSPSPenhora },
        { nome: 'strNumeroCedente', tipo: sql.VarChar, valor: objCartorio.nrCedente },
        { nome: 'FavorecidoCPFCNPJ', tipo: sql.VarChar, valor: objCartorio.favorecidoCPFCNPJ },
        { nome: 'blnDesativado', tipo: sql.VarChar, valor: objCartorio.blnDesativado },
        { nome: 'blnBDL', tipo: sql.VarChar, valor: objCartorio.blnBDL },
        { nome: 'blnParticipaPP', tipo: sql.VarChar, valor: objCartorio.blnParticipaPP },
        { nome: 'blnPECCertidaoDigital', tipo: sql.VarChar, valor: objCartorio.blnPECCertidaoDigital },

      ])
        .then(async ({ recordset }) => {
          resolve(recordset);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static dbbuscaIdVia(via) {
    return new Promise((resolve, reject) => {
      dataBaseTools.executarQuery(`SELECT ID FROM TBLVIAS (NOLOCK) WHERE DESCRICAO LIKE '%${via}%'`)
        .then(({ recordset }) => {
          resolve((recordset[0].ID || null));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  static dbbuscaIdCidade(cidade, idEstado) {
    return new Promise((resolve, reject) => {
      dataBaseTools.executarQuery(`SELECT ID FROM TBLCIDADES (NOLOCK) WHERE CIDADE = '${cidade}' AND IDESTADO = ${idEstado}`)
        .then(({ recordset }) => {
          resolve((recordset[0].ID || null));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  static dbCadastrarCidade(objCartorio, idEstado) {
    return new Promise((resolve, reject) => {
      dataBaseTools.executarProcedure('spr_cidade_insert', [
        { nome: 'IDEstado', tipo: sql.Int, valor: idEstado },
        { nome: 'IDComarca', tipo: sql.Int, valor: 0 },
        { nome: 'Cidade', tipo: sql.VarChar(100), valor: objCartorio.cidade },
        { nome: 'blnComarca', tipo: sql.Bit, valor: 1 },

      ])
        .then(async ({ recordset }) => {
          resolve(recordset);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static dbCadastrarDepartamento(objCartorio, IDInstituicao = null) {
    return new Promise((resolve, reject) => {
      dataBaseTools.executarProcedure('stpDepartamentos', [

        { nome: 'intOperacao', tipo: sql.Int, valor: 1 },
        { nome: 'intIDDepartamento', tipo: sql.Int, valor: null },
        { nome: 'intIDInstituicao', tipo: sql.Int, valor: IDInstituicao },
        { nome: 'intIDCidade', tipo: sql.Int, valor: objCartorio.IDcidade },
        { nome: 'intIDVia', tipo: sql.Int, valor: objCartorio.IDvia },
        { nome: 'intIDTipo', tipo: sql.Int, valor: null },
        { nome: 'strDepartamento', tipo: sql.VarChar(100), valor: objCartorio.razao },
        { nome: 'strLogradouro', tipo: sql.VarChar(50), valor: objCartorio.logradouro },
        { nome: 'strNumero', tipo: sql.VarChar(6), valor: objCartorio.numero },
        { nome: 'strComplemento', tipo: sql.VarChar(20), valor: objCartorio.complemento },
        { nome: 'strBairro', tipo: sql.VarChar(50), valor: objCartorio.bairro },
        { nome: 'strCep', tipo: sql.VarChar(10), valor: objCartorio.cep },
        { nome: 'strDDDTelefone', tipo: sql.VarChar(50), valor: objCartorio.dddTelefone },
        { nome: 'strDDDFax', tipo: sql.VarChar(50), valor: objCartorio.dddfax },
        { nome: 'strTelefone', tipo: sql.VarChar(50), valor: objCartorio.telefone },
        { nome: 'strFax', tipo: sql.VarChar(50), valor: objCartorio.fax },
        { nome: 'strSite', tipo: sql.VarChar(50), valor: objCartorio.site },
        { nome: 'strEmail', tipo: sql.VarChar(100), valor: objCartorio.emailOficial },
        { nome: 'strObservacoes', tipo: sql.Text, valor: objCartorio.observacoes },
        { nome: 'HoraFunc', tipo: sql.VarChar(200), valor: null },
        { nome: 'blnDesativado', tipo: sql.Bit, valor: null },
        { nome: 'strInstituicao', tipo: sql.VarChar(100), valor: null },
        { nome: 'strCNPJ', tipo: sql.VarChar(14), valor: null },
        { nome: 'InscMunicipal', tipo: sql.VarChar(30), valor: '' },
        { nome: 'NumeroConvenio', tipo: sql.VarChar(50), valor: '' },
        { nome: 'strEmailFinanceiro', tipo: sql.VarChar(150), valor: objCartorio.emailOficial },

      ])
        .then(async ({ recordset }) => {
          resolve(recordset);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static dbbuscaIDInstituicao({cnpj}) {
    return new Promise((resolve, reject) => {
      dataBaseTools.executarQuery(`SELECT * FROM TBLInstituicoes (NOLOCK) WHERE CNPJ ='${cnpj}'`)
        .then(({ recordset }) => {
          resolve((recordset[0].ID || null));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

/*   static dbListarDepartamento(objCartorio) {
    return new Promise((resolve, reject) => {
      dataBaseTools.executarProcedure('stpDepartamentos', [

        { nome: 'intOperacao', tipo: sql.Int, valor: 5 },
        { nome: 'intIDDepartamento', tipo: sql.Int, valor: null },
        { nome: 'intIDInstituicao', tipo: sql.Int, valor: null },
        { nome: 'intIDCidade', tipo: sql.Int, valor: objCartorio.cidade },
        { nome: 'intIDVia', tipo: sql.Int, valor: objCartorio.via },
        { nome: 'intIDTipo', tipo: sql.Int, valor: null },
        { nome: 'strDepartamento', tipo: sql.VarChar(100), valor: objCartorio.razao },
        { nome: 'strLogradouro', tipo: sql.VarChar(50), valor: objCartorio.logradouro },
        { nome: 'strNumero', tipo: sql.VarChar(6), valor: objCartorio.numero },
        { nome: 'strComplemento', tipo: sql.VarChar(20), valor: objCartorio.complemento },
        { nome: 'strBairro', tipo: sql.VarChar(50), valor: objCartorio.bairro },
        { nome: 'strCep', tipo: sql.VarChar(10), valor: objCartorio.cep },
        { nome: 'strDDDTelefone', tipo: sql.VarChar(50), valor: objCartorio.dddTelefone },
        { nome: 'strDDDFax', tipo: sql.VarChar(50), valor: objCartorio.dddfax },
        { nome: 'strTelefone', tipo: sql.VarChar(50), valor: objCartorio.telefone },
        { nome: 'strFax', tipo: sql.VarChar(50), valor: objCartorio.fax },
        { nome: 'strSite', tipo: sql.VarChar(50), valor: objCartorio.site },
        { nome: 'strEmail', tipo: sql.VarChar(100), valor: objCartorio.emailOficial },
        { nome: 'strObservacoes', tipo: sql.Text, valor: objCartorio.observacoes },
        { nome: 'HoraFunc', tipo: sql.VarChar(200), valor: null },
        { nome: 'blnDesativado', tipo: sql.Bit, valor: null },
        { nome: 'strInstituicao', tipo: sql.VarChar(100), valor: null },
        { nome: 'strCNPJ', tipo: sql.VarChar(14), valor: null },
        { nome: 'InscMunicipal', tipo: sql.VarChar(30), valor: '' },
        { nome: 'NumeroConvenio', tipo: sql.VarChar(50), valor: '' },
        { nome: 'strEmailFinanceiro', tipo: sql.VarChar(150), valor: objCartorio.emailOficial },

      ])
        .then(async ({ recordset }) => {
          resolve(recordset);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static dbUpDateDepartamento(objCartorio) {
    return new Promise((resolve, reject) => {
      dataBaseTools.executarProcedure('stpDepartamentos', [

        { nome: 'intOperacao', tipo: sql.Int, valor: 6 },
        { nome: 'intIDDepartamento', tipo: sql.Int, valor: null },
        { nome: 'intIDInstituicao', tipo: sql.Int, valor: null },
        { nome: 'intIDCidade', tipo: sql.Int, valor: objCartorio.cidade },
        { nome: 'intIDVia', tipo: sql.Int, valor: objCartorio.via },
        { nome: 'intIDTipo', tipo: sql.Int, valor: null },
        { nome: 'strDepartamento', tipo: sql.VarChar(100), valor: objCartorio.razao },
        { nome: 'strLogradouro', tipo: sql.VarChar(50), valor: objCartorio.logradouro },
        { nome: 'strNumero', tipo: sql.VarChar(6), valor: objCartorio.numero },
        { nome: 'strComplemento', tipo: sql.VarChar(20), valor: objCartorio.complemento },
        { nome: 'strBairro', tipo: sql.VarChar(50), valor: objCartorio.bairro },
        { nome: 'strCep', tipo: sql.VarChar(10), valor: objCartorio.cep },
        { nome: 'strDDDTelefone', tipo: sql.VarChar(50), valor: objCartorio.dddTelefone },
        { nome: 'strDDDFax', tipo: sql.VarChar(50), valor: objCartorio.dddfax },
        { nome: 'strTelefone', tipo: sql.VarChar(50), valor: objCartorio.telefone },
        { nome: 'strFax', tipo: sql.VarChar(50), valor: objCartorio.fax },
        { nome: 'strSite', tipo: sql.VarChar(50), valor: objCartorio.site },
        { nome: 'strEmail', tipo: sql.VarChar(100), valor: objCartorio.emailOficial },
        { nome: 'strObservacoes', tipo: sql.Text, valor: objCartorio.observacoes },
        { nome: 'HoraFunc', tipo: sql.VarChar(200), valor: null },
        { nome: 'blnDesativado', tipo: sql.Bit, valor: null },
        { nome: 'strInstituicao', tipo: sql.VarChar(100), valor: null },
        { nome: 'strCNPJ', tipo: sql.VarChar(14), valor: null },
        { nome: 'InscMunicipal', tipo: sql.VarChar(30), valor: '' },
        { nome: 'NumeroConvenio', tipo: sql.VarChar(50), valor: '' },
        { nome: 'strEmailFinanceiro', tipo: sql.VarChar(150), valor: objCartorio.emailOficial },

      ])
        .then(async ({ recordset }) => {
          resolve(recordset);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } */
}

module.exports = Cartorios;
