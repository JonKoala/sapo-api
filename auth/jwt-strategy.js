var model = require('../models')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var strategyOptions = {
  secretOrKey: process.env['SAPO_JWT_SECRET'],
  jwtFromRequest: ExtractJwt.fromAuthHeader()
}

var strategy = new JwtStrategy(strategyOptions, (payload, done) => {
  
  model.usuario.findById(payload.id)
    .then(usuario => {
      if (usuario) done(null, usuario);
      else throw 'User not found';
    }).catch(err => {
      done(new Error(err), null);
    });
});

module.exports = strategy
