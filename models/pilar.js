var sequelize = require('sequelize')
var db = require('./dbConnection')

var pilar = db.define('pilar', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'pilar_id'
  },
  nome: sequelize.STRING,
  descricao: sequelize.TEXT
}, {
  timestamps: false,
  tableName: 'Pilar'
});

module.exports = pilar;
