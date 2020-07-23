var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.objetoAvaliacao.findAll()
    .then(objetoAvaliacao => {
      res.send(objetoAvaliacao);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.objetoAvaliacao
    .findOne({
      where: { id }
    }).then(objetoAvaliacao => {
      res.send(objetoAvaliacao);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id/resumo', (req, res) => {

  let id = req.params.id;

  model.resumoObjetoAvaliacao
    .findOne({
      where: { id }
    }).then(resumo => {
      res.send(resumo);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/avaliacao/:id/resumo', (req, res) => {

  let id = req.params.id;

  model.resumoObjetoAvaliacao.findAll({where: {avaliacao_id: id}})
    .then(resumos => {
      res.send(resumos);
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
