var sequelize = require('sequelize')
var db = require('../models/dbConnection')
var express = require('express')
var router = express.Router();

router.get('/entidades', (req, res) => {

  db.query(`
    SELECT
    	entidade_id AS id
    	,nome
    	,poder
    	,esfera
    	,geonames_ref AS geonames_uri
    	,dbpedia_ref AS dbpedia_uri
    	,populacao
    	,pib
    FROM Entidade`,
    { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
