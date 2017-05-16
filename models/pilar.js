var sequelize = require('sequelize')
var db = require('./dbConnection')

var pilar = db.define('pilar', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    field: 'pilar_id'
  },
  nome: sequelize.STRING,
  descricao: sequelize.STRING
}, {
  timestamps: false,
  tableName: 'Pilar'
});

module.exports = pilar;
