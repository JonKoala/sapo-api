var sequelize = require('sequelize')
var db = require('./dbConnection')

var perfil = db.define('perfil', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'usuario_id'
  },
  nome: sequelize.STRING,
  permissao: sequelize.INTEGER
}, {
  timestamps: false,
  tableName: 'Perfil'
});

module.exports = perfil;
