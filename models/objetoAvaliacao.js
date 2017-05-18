var sequelize = require('sequelize')
var db = require('./dbConnection')

var objetoAvaliacao = db.define('objetoAvaliacao', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'objeto_avaliacao_id'
  },
  observacoes: sequelize.TEXT
}, {
  timestamps: false,
  tableName: 'Objeto_Avaliacao'
});

module.exports = objetoAvaliacao;
