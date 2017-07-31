var model = require('../models')
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {

  model.avaliacao.findAll()
    .then(avaliacoes => {
      res.send(avaliacoes);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.get('/indicador', (req, res) => {

  model.avaliacao.findAll({include: [{model: model.indicador}]})
    .then(avaliacoes => {
      res.send(avaliacoes);
    }).catch(err => {
      res.status(500).send(err);
    });
});

router.post('/', (req, res) => {

  var data = req.body;
  var avaliacao;

  //create a new avaliacao
  model.avaliacao.create({
      indicador_id: data.avaliacao.indicador_id,
      nome: data.avaliacao.nome,
      objetivos: data.avaliacao.objetivos
    }).then(newAvaliacao => {
      //create objetosAvaliacao from the newly created avaliacao

      avaliacao = newAvaliacao;
      let objsAvaliacao = data.entidades.map(entidade => {
        return {avaliacao_id: avaliacao.id, entidade_id: entidade};
      });

      return model.objetoAvaliacao.bulkCreate(objsAvaliacao);
    }).then(() => {
      //find all objetosAvaliacao related to that avaliacao

      return model.objetoAvaliacao.findAll({attributes: ['id'], where: {avaliacao_id: avaliacao.id}});
    }).then(objetosAvaliacao => {
      //create notas for each newly created objetoAvaliacao

      var notas = [];
      var ids = objetosAvaliacao.map(objAvaliacao => { return objAvaliacao.id; });
      ids.forEach(id => {
        let newNotas = data.itens.map(item => { return {objeto_avaliacao_id: id, item_id: item, usuario_id: 0}; });
        Array.prototype.push.apply(notas, newNotas);
      });

      return model.utils.bulkOperation(model.nota, model.nota.bulkCreate, notas);
    }).then(() => {
      res.send(avaliacao);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
