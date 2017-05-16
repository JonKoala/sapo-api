var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.item.findAll()
    .then(itens => {
      res.send(itens);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.item.findById(id)
    .then(item => {
      res.send(item);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.item.findById(id, { include: [
      {model: model.subnivel},
      {model: model.pontuacao, as: 'pontuacoes'},
      {model: model.criterioLegal, as: 'criteriosLegais', include: [
        {model: model.norma}
      ]}
    ]}).then(item => {
      res.send(item);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
