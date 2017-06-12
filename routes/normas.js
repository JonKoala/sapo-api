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

router.post('/', (req, res) => {

  let newNorma = req.body;

  model.norma.create(newNorma)
    .then(norma => {
      res.send(norma);
    }).catch(err => {
      res.send(err);
    });
});

router.put('/', (req, res) => {

  let norma = req.body;

  model.norma.update(norma, {where: {id: norma.id}})
    .then(() => {
      res.send(norma);
    }).catch(err => {
      res.send(err);
    });
});

router.delete('/', (req, res) => {

  let norma = req.body;

  model.norma.destroy({where: {id: norma.id}})
    .then(() => {
      res.send({deleted: true});
    }).catch(err => {
      res.send({deleted: false, error: err});
    });
});

module.exports = router;
