var sequelize = require('sequelize')
var db = require('./dbConnection')

var pontuacao = db.define('pontuacao', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'pontuacao_id'
  },
  descricao: sequelize.TEXT,
  nota: sequelize.FLOAT
}, {
  timestamps: false,
  tableName: 'Pontuacao'
});

module.exports = pontuacao;
