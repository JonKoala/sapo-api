var sequelize = require('sequelize')
var db = require('./dbConnection')

var navegador = db.define('navegador', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'navegador_id'
  },
  nome: sequelize.STRING,
  versao: sequelize.STRING
}, {
  timestamps: false,
  tableName: 'Navegador'
});

module.exports = navegador;
