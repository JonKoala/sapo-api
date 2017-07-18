var appconfig = require('../appconfig')
var model = require('../models')
var jwt = require("jwt-simple")
var express = require('express')
var router = express.Router();

router.post('/login', (req, res) => {

  model.usuario.findOne({where: {$and: [ {usuario: req.body.usuario}, {senha: req.body.senha} ]}})
    .then(usuario => {
      if (usuario) {
        let token = jwt.encode(usuario, appconfig.auth.secret);
        res.send({token: token, usuario: usuario});
      } else {
        res.status(401).send("User not found");
      }
    }).catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
