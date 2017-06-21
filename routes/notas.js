var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.nota.findAll()
    .then(notas => {
      res.send(notas);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.nota.findById(id)
    .then(nota => {
      res.send(nota);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/objetoavaliacao/:id/full', (req, res) => {

  var id = req.params.id;

  model.nota.findAll({
      where: {objeto_avaliacao_id: id},
      include: [
        {model: model.item, include: [
          {model: model.pontuacao, as: 'pontuacoes'},
          {model: model.subnivel, include: [
            {model: model.nivel, include: [
              {model: model.tipo, include: [
                {model: model.pilar}
              ]}
            ]}
          ]}
        ]}
      ]
    }).then(notas => {
      res.send(notas);
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
