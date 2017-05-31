var sequelize = require('sequelize')
var db = require('./dbConnection')

var tipo = db.define('tipo', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'tipo_id'
  },
  nome: sequelize.STRING,
  descricao: sequelize.TEXT
}, {
  timestamps: false,
  tableName: 'Tipo'
});

module.exports = tipo;
