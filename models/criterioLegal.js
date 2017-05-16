var sequelize = require('sequelize')
var db = require('./dbConnection')

var criterioLegal = db.define('criterioLegal', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    field: 'criterio_legal_id'
  },
  descricao: sequelize.TEXT
}, {
  timestamps: false,
  tableName: 'Criterio_Legal'
});

module.exports = criterioLegal;
