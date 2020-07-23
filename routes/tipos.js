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

  model.tipo
    .findOne({
      where: { id }
    }).then(tipo => {
      res.send(tipo);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/pilar/:id', (req, res) => {

  let id = req.params.id;

  model.tipo.findAll({where: {pilar_id: id}})
    .then(tipos => {
      res.send(tipos);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.tipo
    .findOne({
      where: { id },
      include: [{model: model.pilar}, {model: model.nivel, as: 'niveis'}]
    }).then(tipo => {
      res.send(tipo);
    }).catch(err => {
      res.send(err);
    });
});

router.post('/', (req, res) => {

  let newTipo = req.body;

  model.tipo.create(newTipo)
    .then(tipo => {
      res.send(tipo);
    }).catch(err => {
      res.send(err);
    });
});

router.put('/', (req, res) => {

  let tipo = req.body;

  model.tipo.update(tipo, {where: {id: tipo.id}})
    .then(() => {
      res.send(tipo);
    }).catch(err => {
      res.send(err);
    });
});

router.delete('/', (req, res) => {

  let tipo = req.body;

  model.tipo.destroy({where: {id: tipo.id}})
    .then(() => {
      res.send({deleted: true});
    }).catch(err => {
      res.send({deleted: false, error: err});
    });
});

module.exports = router;
