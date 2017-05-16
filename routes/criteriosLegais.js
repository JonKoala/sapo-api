var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.criterioLegal.findAll()
    .then(criteriosLegais => {
      res.send(criteriosLegais);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.criterioLegal.findById(id)
    .then(criterioLegal => {
      res.send(criterioLegal);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.criterioLegal.findById(id, { include: [{model: model.item, as: 'itens'}, {model: model.norma}] })
    .then(criterioLegal => {
      res.send(criterioLegal);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
