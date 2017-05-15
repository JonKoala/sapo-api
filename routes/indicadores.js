var express = require('express');
var router = express.Router();
var indicador = require('../models/indicador');

router.get('/', (req, res) => {

  indicador.findAll()
    .then(indicadores => {
      res.send(indicadores);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  indicador.findById(id)
    .then(indicador => {
      res.send(indicador);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
