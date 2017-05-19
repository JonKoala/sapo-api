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

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.pilar.findById(id)
    .then(pilar => {
      res.send(pilar);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/indicador/:id', (req, res) => {

  let id = req.params.id;

  model.pilar.findAll({where: {indicador_id: id}})
    .then(pilares => {
      res.send(pilares);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.pilar.findById(id, { include: [{model: model.indicador}, {model: model.tipo, as: 'tipos'}] })
    .then(pilar => {
      res.send(pilar);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
