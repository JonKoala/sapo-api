var sequelize = require('sequelize')
var db = require('./dbConnection')

var nota = db.define('nota', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'nota_id'
  },
  avaliacao: {
    type: sequelize.DATE,
    field: 'avaliacao_dt'
  },
  evidencias: sequelize.TEXT,
  observacoes: sequelize.TEXT
}, {
  timestamps: false,
  tableName: 'Nota'
});

module.exports = nota;
