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

router.post('/', (req, res) => {

  let newNivel = req.body;

  model.nivel.create(newNivel)
    .then(nivel => {
      res.send(nivel);
    }).catch(err => {
      res.send(err);
    });
});

router.put('/', (req, res) => {

  let nivel = req.body;

  model.nivel.update(nivel, {where: {id: nivel.id}})
    .then(() => {
      res.send(nivel);
    }).catch(err => {
      res.send(err);
    });
});

router.delete('/', (req, res) => {

  let nivel = req.body;

  model.nivel.destroy({where: {id: nivel.id}})
    .then(() => {
      res.send({deleted: true});
    }).catch(err => {
      res.send({deleted: false, error: err});
    });
});

module.exports = router;
