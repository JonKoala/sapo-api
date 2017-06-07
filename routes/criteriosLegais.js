var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.criterioLegal.findAll()
    .then(criteriosLegais => {
      res.send(criteriosLegais);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.criterioLegal.findById(id)
    .then(criterioLegal => {
      res.send(criterioLegal);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.criterioLegal.findById(id, { include: [{model: model.item, as: 'itens'}, {model: model.norma}] })
    .then(criterioLegal => {
      res.send(criterioLegal);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/item/:id', (req, res) => {

  let id = req.params.id;

  model.criterioLegal.findAll({include: [{model: model.item, as: 'itens', where: {item_id: id}}, {model: model.norma}]})
    .then(criteriosLegais => {
      res.send(criteriosLegais);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/item/not/:id', (req, res) => {

  let id = req.params.id;

  model.itemCriterioLegal.findAll({where: {item_id: id}})
    .then(itensCriteriosLegais =>  {
      let tabuList = itensCriteriosLegais.map(i => {return i.criterio_legal_id;});
      let whereObject = (tabuList.length > 0) ? {criterio_legal_id: {$notIn: tabuList}} : {}; /* TODO: reportar */

      return model.criterioLegal.findAll({where: whereObject, include: [{model: model.norma}]});
    }).then(criteriosLegais =>  {
      res.send(criteriosLegais);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
