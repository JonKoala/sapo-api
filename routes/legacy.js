var sequelize = require('sequelize')
var db = require('../models/dbConnection')
var model = require('../models')
var express = require('express')
var router = express.Router();

//TODO: Remover dependencia (group-array) quando deixar de usar o legacy.js
var groupArray = require('group-array');


//
//GET

router.get('/indicador', (req, res) => {

  db.query(`
    SELECT
    	indicador_id AS id
    	,nome
    	,objetivos
    FROM Indicador`,
    { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/entidades', (req, res) => {

  db.query(`
    SELECT
    	entidade_id AS id
    	,nome
    	,poder
    	,esfera
    	,geonames_ref AS geonames_uri
    	,dbpedia_ref AS dbpedia_uri
    	,populacao
    	,pib
    FROM Entidade`,
    { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/avaliacao', (req, res) => {

  db.query(`
    SELECT
    	avaliacao_id AS id
    	,indicador_id AS Indicador_id
    	,nome
    	,objetivos
    	,CONVERT(VARCHAR(10), inicio_dt, 120) AS dt_Inicio
    FROM Avaliacao`,
    { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/objetoavaliacao/:id', (req, res) => {

  let id = req.params.id;

  db.query(`
    SELECT
      OA.objeto_avaliacao_id AS id
      ,OA.entidade_id AS Entidade_id
      ,OA.avaliacao_id AS Avaliacao_id
      ,OA.observacoes
    	,A.nome
    FROM Objeto_Avaliacao OA
    INNER JOIN Avaliacao A ON A.avaliacao_id = OA.avaliacao_id
    WHERE OA.avaliacao_id = ` + id,
  { type: sequelize.QueryTypes.SELECT})
  .then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err);
  });
});

router.get('/nota/:id', (req, res) => {

  let id = req.params.id;

  db.query(`
    SELECT
    	nota_id AS id
    	,usuario_id AS Usuario_id
    	,pontuacao_id AS Pontuacao_id
    	,item_id AS Item_id
    	,objeto_avaliacao_id AS ObjetoDeAvaliacao_id
      ,CONVERT(VARCHAR(10), avaliacao_dt, 120) as dt_Avaliacao
    	,evidencias
    	,observacoes
    FROM Nota
    WHERE objeto_avaliacao_id = ` + id,
  { type: sequelize.QueryTypes.SELECT})
  .then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err);
  });
});

router.get('/itemrelacionado/:id', (req, res) => {

  let id = req.params.id;

  db.query(`
    SELECT
    	itens.id
    	,itens.subnivel_id AS Subnivel_id
    	,itens.nome
    	,itens.exigencia
    	,itens.nota_maxima AS notaMaxima
    	,itens.obrigatorio
      ,itens.pilar
      ,itens.nivel
      ,itens.subnivel
    	,nots.nota_id
    	,nots.pontuacao_id
    	,ent.nome AS entidade
    	,itens.tipando AS tipo

      ,ponts.pontuacao_id AS ponts_id
      ,ponts.item_id AS ponts_item_id
      ,ponts.descricao AS ponts_descricao
      ,ponts.nota AS ponts_nota
    FROM
    	(SELECT
    		tip.nome AS tipando
    		,i.item_id AS id
    		,i.subnivel_id
    		,i.nome
    		,i.exigencia
    		,i.nota_maxima
    		,i.obrigatorio
    		,pil.nome AS pilar
    		,niv.nome AS nivel
    		,sub.nome AS subnivel
    	FROM Item AS i
    	INNER JOIN Subnivel AS sub ON i.subnivel_id = sub.subnivel_id
    	INNER JOIN Nivel AS niv ON sub.nivel_id = niv.nivel_id
    	INNER JOIN Tipo AS tip ON tip.tipo_id = niv.tipo_id
    	INNER JOIN Pilar AS pil ON pil.pilar_id = tip.pilar_id
    	INNER JOIN Indicador AS ind ON pil.indicador_id = ind.indicador_id
    	) AS itens
    INNER JOIN Nota AS nots ON nots.item_id = itens.id
    INNER JOIN Objeto_Avaliacao AS obj ON obj.objeto_avaliacao_id = nots.objeto_avaliacao_id
    INNER JOIN Entidade AS ent ON obj.entidade_id = ent.entidade_id
    INNER JOIN Pontuacao AS ponts ON ponts.item_id = nots.item_id
    WHERE nots.objeto_avaliacao_id= ` + id + `
    ORDER BY notaMaxima`,
  { type: sequelize.QueryTypes.SELECT})
  .then(queryResult => {

    let groupedResult = groupArray(queryResult, 'id');
    let keys = Object.keys(groupedResult);

    let result = [];
    keys.forEach(key => {
      let line = groupedResult[key];
      if (line && line.length > 0) {
        let entry = {
          id: line[0].id,
          Subnivel_id: line[0].Subnivel_id,
          nome: line[0].nome,
          exigencia: line[0].exigencia,
          notaMaxima: line[0].notaMaxima,
          obrigatorio: line[0].obrigatorio,
          pilar: line[0].pilar,
          nivel: line[0].nivel,
          subnivel: line[0].subnivel,
          nota_id: line[0].nota_id,
          pontuacao_id: line[0].pontuacao_id,
          entidade: line[0].entidade,
          tipo: line[0].tipo
        };

        entry.pontuacoes = [];
        line.forEach(lineData => {
          let pontuacao = {
            id: lineData.ponts_id,
            Item_id: lineData.ponts_item_id,
            descricao: lineData.ponts_descricao,
            nota: lineData.ponts_nota
          }

          entry.pontuacoes.push(pontuacao);
        });

        result.push(entry);
      }
    });

    res.send(result);
  }).catch(err => {
    res.send(err);
  });
});

var groupArray = require('group-array');

router.get('/usuario', (req, res) => {

  db.query(`
    SELECT
    	usuario_id AS id
    	,perfil_id AS Perfil_id
    	,usuario
    	,senha
    FROM Usuario`,
    { type: sequelize.QueryTypes.SELECT})
    .then(queryResult => {

      let result = {};
      let count = 1;
      queryResult.forEach(user => {
        result[count] = user;
        count++;
      });

      res.send(result);
    }).catch(err => {
      res.send(err);
    });
});

router.get('/itens_indicador/:id', (req, res) => {

  let id = req.params.id;

  db.query(`
      SELECT
      	i.item_id AS id
        ,i.nome
        ,i.exigencia
        ,i.nota_maxima AS notaMaxima
        ,i.obrigatorio
      FROM Item AS i
      INNER JOIN Subnivel AS sub ON i.subnivel_id = sub.subnivel_id
      INNER JOIN Nivel AS niv ON sub.nivel_id = niv.nivel_id
      INNER JOIN Tipo AS tip ON niv.tipo_id = tip.tipo_id
      INNER JOIN Pilar AS pil ON tip.pilar_id = pil.pilar_id
      INNER JOIN Indicador AS ind ON pil.indicador_id = ind.indicador_id
      WHERE ind.indicador_id = ` + id,
      { type: sequelize.QueryTypes.SELECT}
    ).then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    });
});


//
//POST

router.post('/avaliacao/:indicador/:nome/:inicio/:objetivos?', (req, res) => {

  model.avaliacao.create({
      indicador_id: req.params.indicador,
      nome: req.params.nome,
      inicio: req.params.inicio,
      objetivos: req.params.objetivos
    }).then(avaliacao => {
      res.send(avaliacao);
    }).catch(err => {
      res.send(err);
    });
});

router.post('/objetoavaliacao/:entidade/:avaliacao/:observacoes?', (req, res) => {

  model.objetoAvaliacao.create({
      entidade_id: req.params.entidade,
      avaliacao_id: req.params.avaliacao,
      observacoes: req.params.observacoes
    }).then(objetoAvaliacao => {
      res.send(objetoAvaliacao);
    }).catch(err => {
      res.send(err);
    });
});

router.post('/nota/:usuario/:item/:objetoAvaliacao', (req, res) => {

  model.nota.create({
      usuario_id: req.params.usuario,
      item_id: req.params.item,
      objeto_avaliacao_id: req.params.objetoAvaliacao
    }).then(nota => {
      res.send(nota);
    }).catch(err => {
      res.send(err);
    });
});


//
//PUT

router.put('/nota/:nota/:usuario/:pontuacao/:avaliacao', (req, res) => {

  model.nota.findById(req.params.nota)
    .then(nota => {
      nota.usuario_id = req.params.usuario;
      nota.pontuacao_id = req.params.pontuacao;
      nota.avaliacao = req.params.avaliacao;
      return nota.save();
    }).then(nota => {
      res.send(nota);
    }).catch(err => {
      res.send(err);
    });
});


//
//DELETE

router.delete('/objetoavaliacao-delete/:id', (req, res) => {

  let id = req.params.id;

  model.nota.destroy({where: {objeto_avaliacao_id: id}})
    .then(() => {
      return model.objetoAvaliacao.destroy({where: {id:id}});
    }).then(() => {
      res.send(id);
    }).catch(err => {
      res.send(err);
    });
});

router.delete('/avaliacao-delete/:id', (req, res) => {

  let id = req.params.id;

  model.objetoAvaliacao.findAll({where: {avaliacao_id:id}})
    .then(objetosAvaliacao => {
      objetoAvaliacaoIds = objetosAvaliacao.map(objetosAvaliacao => { return objetosAvaliacao.id; });
      return model.nota.destroy({where: {objeto_avaliacao_id: {$in: objetoAvaliacaoIds}}});
    }).then(() => {
      return model.objetoAvaliacao.destroy({where: {avaliacao_id: id}});
    }).then(() => {
      return model.avaliacao.destroy({where: {id:id}});
    }).then(() => {
      res.send(id);
    }).catch(err => {
      res.send(err);
    });
});

module.exports = router;
