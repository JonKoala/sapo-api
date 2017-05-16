var sequelize = require('sequelize')
var db = require('./dbConnection')

var itemCriterioLegal = db.define('itemCriterioLegal', {
  item_id: sequelize.INTEGER,
  criterio_legal_id: sequelize.INTEGER
}, {
  timestamps: false,
  tableName: 'Item_Criterio_Legal'
});

module.exports = itemCriterioLegal;
