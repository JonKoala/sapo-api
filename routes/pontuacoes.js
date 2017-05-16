var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.pontuacao.findAll()
    .then(pontuacoes => {
      res.send(pontuacoes);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.pontuacao.findById(id)
    .then(pontuacao => {
      res.send(pontuacao);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.pontuacao.findById(id, { include: [{model: model.item}] })
    .then(pontuacao => {
      res.send(pontuacao);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
