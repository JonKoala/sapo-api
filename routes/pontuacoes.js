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

  model.pontuacao
    .findOne({
      where: { id }
    }).then(pontuacao => {
      res.send(pontuacao);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.pontuacao
    .findOne({
      where: { id },
      include: [{model: model.item}]
    }).then(pontuacao => {
      res.send(pontuacao);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/item/:id', (req, res) => {

  let id = req.params.id;

  model.pontuacao.findAll({where: {item_id: id}})
    .then(pontuacoes => {
      res.send(pontuacoes);
    }).catch(err => {
      res.send(err);
    });
});

router.post('/', (req, res) => {

  let newPontuacao = req.body;

  model.pontuacao.create(newPontuacao)
    .then(pontuacao => {
      res.send(pontuacao);
    }).catch(err => {
      res.send(err);
    });
});

router.put('/', (req, res) => {

  let pontuacao = req.body;

  model.pontuacao.update(pontuacao, {where: {id: pontuacao.id}})
    .then(() => {
      res.send(pontuacao);
    }).catch(err => {
      res.send(err);
    });
});

router.delete('/', (req, res) => {

  let pontuacao = req.body;

  model.pontuacao.destroy({where: {id: pontuacao.id}})
    .then(() => {
      res.send({deleted: true});
    }).catch(err => {
      res.send({deleted: false, error: err});
    });
});

module.exports = router;
