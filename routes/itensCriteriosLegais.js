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

module.exports = router;
