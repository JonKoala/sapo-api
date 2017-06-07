var model = require('../models')
var express = require('express')
var router = express.Router();

router.post('/', (req, res) => {

  let newItensCriteriosLegais = req.body;

  model.itemCriterioLegal.bulkCreate(newItensCriteriosLegais)
    .then(itensCriteriosLegais => {
      res.send(itensCriteriosLegais);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.delete('/', (req, res) => {

  let itemCriterioLegal = req.body;

  model.itemCriterioLegal.destroy({where: {
        item_id: itemCriterioLegal.item_id
        ,criterio_legal_id: itemCriterioLegal.criterio_legal_id
      }
    }).then(affectedRows  => {
      res.send({deleted: true});
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
