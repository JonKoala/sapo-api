var model = require('../models')
var { Op } = require("sequelize")
var jwt = require('jwt-simple')
var express = require('express')
var router = express.Router();

router.post('/login', (req, res) => {

  model.usuario.findOne({
      where: {[Op.and]: [ {usuario: req.body.usuario}, {senha: req.body.senha} ]},
      include: [ {model: model.navegador}, {model: model.perfil} ]
    }).then(usuario => {
      if (usuario) {
        let token = jwt.encode(usuario, process.env['SAPO_JWT_SECRET']);
        res.send({token: token, usuario: usuario});
      } else {
        res.status(401).send("User not found");
      }
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
