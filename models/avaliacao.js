var sequelize = require('sequelize')
var db = require('./dbConnection')

var avaliacao = db.define('avaliacao', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'avaliacao_id'
  },
  nome: sequelize.STRING,
  objetivos: sequelize.TEXT,
  inicio: {
    type: sequelize.DATE,
    field: 'inicio_dt'
  },
  fim: {
    type: sequelize.DATE,
    field: 'fim_dt'
  }
}, {
  timestamps: false,
  tableName: 'Avaliacao'
});

module.exports = avaliacao;
