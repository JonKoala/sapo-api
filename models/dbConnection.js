var Sequelize = require('sequelize')

var db = new Sequelize({
  dialect: 'mssql',
  dialectModulePath: 'sequelize-msnodesqlv8',
  dialectOptions: {
    trustedConnection: true
  },
  host: 'tcees43',
  database: 'SAPO',

  logging: false
});

module.exports = db;
