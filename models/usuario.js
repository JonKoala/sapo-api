var sequelize = require('sequelize')
var db = require('./dbConnection')

var usuario = db.define('usuario', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'usuario_id'
  },
  usuario: sequelize.STRING,
  senha: sequelize.STRING
}, {
  timestamps: false,
  tableName: 'Usuario'
});

module.exports = usuario;
