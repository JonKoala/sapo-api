var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.indicador.findAll()
    .then(indicadores => {
      res.send(indicadores);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.indicador.findById(id)
    .then(indicador => {
      res.send(indicador);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.indicador.findById(id, { include: [{model: model.pilar, as: 'pilares'}] })
    .then(indicador => {
      res.send(indicador);
    }).catch(err => {
      res.send(err);
    });
});

router.post('/new', (req, res) => {

  let newIndicador = req.body;

  model.indicador.create(newIndicador)
    .then(indicador => {
      res.send(indicador);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
