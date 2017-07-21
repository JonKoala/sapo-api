var model = require('../models')
var auth = require('../auth')
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
        {model: model.pontuacao},
        {model: model.item, include: [
          {model: model.pontuacao, as: 'pontuacoes'},
          {model: model.subnivel, include: [
            {model: model.nivel, include: [
              {model: model.tipo, include: [
                {model: model.pilar, include: [
                  {model: model.indicador}
                ]}
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

router.put('/', auth.authenticate(), (req, res) => {

  var nota = req.body;
  nota.usuario_id = req.user.id;

  model.nota.update(nota, {where: {id: nota.id}})
    .then(() => {
      res.send(nota);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.put('/pontuacao', auth.authenticate(), (req, res) => {

  var id = req.body.nota_id;
  var pontuacao = req.body.pontuacao_id;
  var usuario = req.user.id;

  model.nota.update({pontuacao_id: pontuacao, usuario_id: usuario}, {where: {id: id}})
    .then(rows => {
      res.send({affected: rows, nota: id, pontuacao: pontuacao});
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
