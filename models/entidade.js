var sequelize = require('sequelize')
var db = require('./dbConnection')

var entidade = db.define('entidade', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'entidade_id'
  },
  nome: sequelize.STRING,
  poder: sequelize.STRING,
  esfera: sequelize.STRING,
  geonames: {
    type: sequelize.STRING,
    field: 'geonames_ref'
  },
  dbpedia: {
    type: sequelize.STRING,
    field: 'dbpedia_ref'
  },
  populacao: sequelize.INTEGER,
  pib: sequelize.FLOAT
}, {
  timestamps: false,
  tableName: 'Entidade'
});

module.exports = entidade;
