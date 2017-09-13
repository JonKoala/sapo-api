var sequelize = require('sequelize')
var db = require('./dbConnection')

var resumoObjetoAvaliacao = db.define('resumoObjetoAvaliacao', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'objeto_avaliacao_id'
  },
  entidade: sequelize.STRING,
  observacoes: sequelize.STRING,
  nota: {
    type: sequelize.FLOAT,
    field: 'nota_somatorio'
  },
  totalAbsoluto: {
    type: sequelize.FLOAT,
    field: 'total_absoluto'
  },
  totalRelativo: {
    type: sequelize.FLOAT,
    field: 'total_relativo'
  },
  conclusao: sequelize.FLOAT
}, {
  timestamps: false,
  tableName: 'Resumo_Objeto_Avaliacao'
});

module.exports = resumoObjetoAvaliacao;
