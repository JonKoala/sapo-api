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

  model.subnivel.findById(id)
    .then(subnivel => {
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

  model.subnivel.findById(id, { include: [{model: model.nivel}, {model: model.item, as: 'itens'}] })
    .then(subnivel => {
      res.send(subnivel);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
