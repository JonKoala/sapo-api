var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.pilar.findAll()
    .then(pilares => {
      res.send(pilares);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.pilar.findById(id)
    .then(pilar => {
      res.send(pilar);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/indicador/:id', (req, res) => {

  let id = req.params.id;

  model.pilar.findAll({where: {indicador_id: id}})
    .then(pilares => {
      res.send(pilares);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.pilar.findById(id, { include: [{model: model.indicador}, {model: model.tipo, as: 'tipos'}] })
    .then(pilar => {
      res.send(pilar);
    }).catch(err => {
      res.send(err);
    });
});

router.post('/', (req, res) => {

  let newPilar = req.body;

  model.pilar.create(newPilar)
    .then(pilar => {
      res.send(pilar);
    }).catch(err => {
      res.send(err);
    });
});

router.put('/', (req, res) => {

  let pilar = req.body;

  model.pilar.update(pilar, {where: {id: pilar.id}})
    .then(() => {
      res.send(pilar);
    }).catch(err => {
      res.send(err);
    });
});

router.delete('/', (req, res) => {

  let pilar = req.body;

  model.pilar.destroy({where: {id: pilar.id}})
    .then(() => {
      res.send({deleted: true});
    }).catch(err => {
      res.send({deleted: false, error: err});
    });
});

module.exports = router;
