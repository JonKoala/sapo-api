var sequelize = require('sequelize')
var db = require('./dbConnection')

var nivel = db.define('nivel', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    field: 'nivel_id'
  },
  nome: sequelize.STRING,
  descricao: sequelize.STRING
}, {
  timestamps: false,
  tableName: 'Nivel'
});

module.exports = nivel;
