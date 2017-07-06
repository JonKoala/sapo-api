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
        {model: model.navegador},
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

router.put('/', (req, res) => {

  let nota = req.body;

  model.nota.update(nota, {where: {id: nota.id}})
    .then(() => {
      res.send(nota);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.put('/pontuacao', (req, res) => {

  var id = req.body.nota_id;
  var pontuacao = req.body.pontuacao_id;

  model.nota.update({pontuacao_id: pontuacao}, {where: {id: id}})
    .then(rows => {
      res.send({affected: rows, nota: id, pontuacao: pontuacao});
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
