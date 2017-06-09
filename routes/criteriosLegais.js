var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.criterioLegal.findAll()
    .then(criteriosLegais => {
      res.send(criteriosLegais);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/full', (req, res) => {

  model.criterioLegal.findAll({include: [{model: model.item, as: 'itens'}, {model: model.norma}]})
    .then(criteriosLegais => {
      res.send(criteriosLegais);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {

  var id = req.params.id;

  model.criterioLegal.findById(id)
    .then(criterioLegal => {
      res.send(criterioLegal);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id/full', (req, res) => {

  var id = req.params.id;

  model.criterioLegal.findById(id, { include: [{model: model.item, as: 'itens'}, {model: model.norma}] })
    .then(criterioLegal => {
      res.send(criterioLegal);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id/item/:fk/full', (req, res) => {

  var id = req.params.id;
  var fk = req.params.fk;

  model.criterioLegal.findOne({
      where: {id: id}
      ,include: [
        {model: model.item, as: 'itens', where: {item_id: fk}}
        ,{model: model.norma}
      ]
    }).then(criterioLegal => {
      let response = JSON.parse(JSON.stringify(criterioLegal));

      response.item = criterioLegal.itens[0];
      delete response.itens;

      res.send(response);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/item/:id', (req, res) => {

  var id = req.params.id;

  model.criterioLegal.findAll({include: [{model: model.item, as: 'itens', where: {item_id: id}}, {model: model.norma}]})
    .then(criteriosLegais => {
      res.send(criteriosLegais);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/item/not/:id', (req, res) => {

  var id = req.params.id;

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

router.post('/', (req, res) => {

  let newCriterioLegal = req.body;

  model.criterioLegal.create(newCriterioLegal)
    .then(criterioLegal => {
      res.send(criterioLegal);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.put('/', (req, res) => {

  let criterioLegal = req.body;

  model.criterioLegal.update(criterioLegal, {where: {id: criterioLegal.id}})
    .then(() => {
      res.send(criterioLegal);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.delete('/', (req, res) => {

  let criterioLegal = req.body;

  model.criterioLegal.destroy({where: {id: criterioLegal.id}})
    .then(() => {
      res.send({deleted: true});
    }).catch(err => {
      res.send({deleted: false, error: err});
    });
});

module.exports = router;
