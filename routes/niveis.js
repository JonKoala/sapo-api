var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.nivel.findAll()
    .then(niveis => {
      res.send(niveis);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.nivel.findById(id)
    .then(nivel => {
      res.send(nivel);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/tipo/:id', (req, res) => {

  let id = req.params.id;

  model.nivel.findAll({where: {tipo_id: id}})
    .then(niveis => {
      res.send(niveis);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.nivel.findById(id, { include: [{model: model.tipo}, {model: model.subnivel, as: 'subniveis'}] })
    .then(nivel => {
      res.send(nivel);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
