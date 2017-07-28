var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.entidade.findAll()
    .then(entidade => {
      res.send(entidade);
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
