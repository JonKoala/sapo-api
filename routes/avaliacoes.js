var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.avaliacao.findAll()
    .then(avaliacoes => {
      res.send(avaliacoes);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/indicador', (req, res) => {

  model.avaliacao.findAll({include: [{model: model.indicador}]})
    .then(avaliacoes => {
      res.send(avaliacoes);
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
