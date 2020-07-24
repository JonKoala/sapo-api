var Sequelize = require('sequelize')

var db = new Sequelize({
  host: process.env['SAPO_DATABASE_HOST'],
  database: process.env['SAPO_DATABASE_NAME'],
  username: process.env['SAPO_DATABASE_USERNAME'],
  password: process.env['SAPO_DATABASE_PASSWORD'],

  dialect: 'mssql',
  logging: false
});

module.exports = db;
