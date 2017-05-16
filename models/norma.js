var sequelize = require('sequelize')
var db = require('./dbConnection')

var norma = db.define('norma', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    field: 'norma_id'
  },
  tipo: sequelize.STRING,
  nome: sequelize.STRING
}, {
  timestamps: false,
  tableName: 'Norma'
});

module.exports = norma;
