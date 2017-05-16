var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.pilar.findAll()
    .then(pilares => {
      res.send(pilares);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/full', (req, res) => {

  model.pilar.findAll({ include: [model.indicador] })
    .then(pilares => {
      res.send(pilares);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.pilar.findById(id)
    .then(pilar => {
      res.send(pilar);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/full/:id', (req, res) => {

  let id = req.params.id;

  model.pilar.findById(id, { include: [model.indicador] })
    .then(pilar => {
      res.send(pilar);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
