var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.navegador.findAll()
    .then(navegadores => {
      res.send(navegadores);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.navegador
    .findOne({
      where: { id }
    }).then(navegadores => {
      res.send(navegadores);
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
