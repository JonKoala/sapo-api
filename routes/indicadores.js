var express = require('express');
var router = express.Router();
var indicador = require('../models/indicador');

router.get('/all', (req, res) => {

  indicador.getAll()
    .then((indicadores) => {
      res.send(indicadores);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
