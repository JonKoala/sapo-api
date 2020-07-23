var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.subnivel.findAll()
    .then(subniveis => {
      res.send(subniveis);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.subnivel
    .findOne({
      where: { id }
    }).then(subnivel => {
      res.send(subnivel);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/nivel/:id', (req, res) => {

  let id = req.params.id;

  model.subnivel.findAll({where: {nivel_id: id}})
    .then(subniveis => {
      res.send(subniveis);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.subnivel
    .findOne({
      where: { id },
      include: [{model: model.nivel}, {model: model.item, as: 'itens'}]
    }).then(subnivel => {
      res.send(subnivel);
    }).catch(err => {
      res.send(err);
    });
});

router.post('/', (req, res) => {

  let newSubnivel = req.body;

  model.subnivel.create(newSubnivel)
    .then(subnivel => {
      res.send(subnivel);
    }).catch(err => {
      res.send(err);
    });
});

router.put('/', (req, res) => {

  let subnivel = req.body;

  model.subnivel.update(subnivel, {where: {id: subnivel.id}})
    .then(() => {
      res.send(subnivel);
    }).catch(err => {
      res.send(err);
    });
});

router.delete('/', (req, res) => {

  let subnivel = req.body;

  model.subnivel.destroy({where: {id: subnivel.id}})
    .then(() => {
      res.send({deleted: true});
    }).catch(err => {
      res.send({deleted: false, error: err});
    });
});

module.exports = router;
