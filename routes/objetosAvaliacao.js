var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.objetoAvaliacao.findAll()
    .then(objetoAvaliacao => {
      res.send(objetoAvaliacao);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {

  let id = req.params.id;

  model.objetoAvaliacao.findById(id)
    .then(objetoAvaliacao => {
      res.send(objetoAvaliacao);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:id/full', (req, res) => {

  let id = req.params.id;

  model.objetoAvaliacao.findById(id, { include: [
        {model: model.avaliacao},
        {model: model.entidade},
        {model: model.nota, as: 'notas'}
      ]
    }).then(objetoAvaliacao => {
      res.send(objetoAvaliacao);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/avaliacao/:id/full', (req, res) => {

  let id = req.params.id;

  model.objetoAvaliacao.findAll({
      where: {avaliacao_id: id},
      include: [
        {model: model.avaliacao},
        {model: model.entidade},
        {model: model.nota, as: 'notas', include: [
          {model: model.item},
          {model: model.pontuacao}
        ]}
      ]
    }).then(objetoAvaliacao => {
      res.send(objetoAvaliacao);
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
