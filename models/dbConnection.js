var Sequelize = require('sequelize')
var appconfig = require('../appconfig')

var db = new Sequelize({
  host: appconfig.db.host,
  database: appconfig.db.database,
  username: appconfig.db.username,
  password: appconfig.db.password,

  dialect: 'mssql',
  logging: false
});

module.exports = db;
