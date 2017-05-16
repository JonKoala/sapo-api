var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.norma.findAll()
    .then(normas => {
      res.send(normas);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.norma.findById(id)
    .then(norma => {
      res.send(norma);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.norma.findById(id, { include: [{model: model.criterioLegal, as: 'criteriosLegais'}] })
    .then(norma => {
      res.send(norma);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
