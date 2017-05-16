var sequelize = require('sequelize')
var db = require('./dbConnection')

var subnivel = db.define('subnivel', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    field: 'subnivel_id'
  },
  nome: sequelize.STRING,
  descricao: sequelize.TEXT
}, {
  timestamps: false,
  tableName: 'Subnivel'
});

module.exports = subnivel;
