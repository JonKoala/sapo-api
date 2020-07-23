var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.usuario.findAll()
    .then(usuarios => {
      res.send(usuarios);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.usuario
    .findOne({
      where: { id }
    }).then(usuario => {
      res.send(usuario);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.usuario
    .findOne({
      where: { id },
      include: [ {model: model.navegador}, {model: model.perfil} ]
    })
    .then(usuario => {
      res.send(usuario);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.put('/', (req, res) => {

  let usuario = req.body;

  model.usuario.update(usuario, {where: {id: usuario.id}})
    .then(() => {
      return model.usuario.findById(usuario.id, { include: [ {model: model.navegador}, {model: model.perfil} ] });
    }).then(usuario => {
      res.send(usuario);
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
