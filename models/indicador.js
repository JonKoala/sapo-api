var sequelize = require('sequelize')
var db = require('./dbConnection')

var indicador = db.define('indicador', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    field: 'indicador_id'
  },
  nome: sequelize.STRING,
  objetivos: sequelize.TEXT
}, {
  timestamps: false,
  tableName: 'Indicador'
});

module.exports = indicador;
