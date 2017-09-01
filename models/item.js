var sequelize = require('sequelize')
var db = require('./dbConnection')

var item = db.define('item', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'item_id'
  },
  nome: sequelize.STRING,
  exigencia: sequelize.TEXT,
  notaMaxima: {
    type: sequelize.FLOAT,
    field: 'nota_maxima'
  },
  obrigatorio: sequelize.INTEGER
}, {
  timestamps: false,
  tableName: 'Item'
});

module.exports = item;
