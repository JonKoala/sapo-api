var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.tipo.findAll()
    .then(tipos => {
      res.send(tipos);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.tipo.findById(id)
    .then(tipo => {
      res.send(tipo);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.tipo.findById(id, { include: [{model: model.pilar}, {model: model.nivel, as: 'niveis'}] })
    .then(tipo => {
      res.send(tipo);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
