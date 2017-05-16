var sequelize = require('sequelize')
var db = require('./dbConnection')

var tipo = db.define('tipo', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    field: 'tipo_id'
  },
  nome: sequelize.STRING,
  descricao: sequelize.STRING
}, {
  timestamps: false,
  tableName: 'Tipo'
});

module.exports = tipo;
