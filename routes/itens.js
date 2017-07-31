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

router.get('/subnivel/:id', (req, res) => {

  let id = req.params.id;

  model.item.findAll({where: {subnivel_id: id}})
    .then(itens => {
      res.send(itens);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/indicador/:id', (req, res) => {

  let id = req.params.id;

  model.item.findAll({include: [
      {model: model.subnivel, include: [
        {model: model.nivel, include: [
          {model: model.tipo, include: [
            {model: model.pilar, where: {indicador_id: id}}
          ]}
        ]}
      ]}
    ]}).then(itens => {
      res.send(itens);
    }).catch(err => {
      res.send(err);
    });
});

router.post('/', (req, res) => {

  let newItem = req.body;

  model.item.create(newItem)
    .then(item => {
      res.send(item);
    }).catch(err => {
      res.send(err);
    });
});

router.put('/', (req, res) => {

  let item = req.body;

  model.item.update(item, {where: {id: item.id}})
    .then(() => {
      res.send(item);
    }).catch(err => {
      res.send(err);
    });
});

router.delete('/', (req, res) => {

  let item = req.body;

  model.item.destroy({where: {id: item.id}})
    .then(() => {
      res.send({deleted: true});
    }).catch(err => {
      res.send({deleted: false, error: err});
    });
});

module.exports = router;
