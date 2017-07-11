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

  model.avaliacao.findAll({include: [{model: model.indicador}], where: {id: {$notIn: [20,21,22,23,24,27]}}})
    .then(avaliacoes => {
      res.send(avaliacoes);
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
