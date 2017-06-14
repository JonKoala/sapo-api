var passport = require('passport')
var LocalStrategy = require('passport-local')
var JwtStrategy = require('passport-jwt').Strategy
var extractJwt = require('passport-jwt').ExtractJwt
var model = require('../models')

var localOptions = {usernameField: 'usuario', passwordField: 'senha'};
var localLogin = new LocalStrategy(localOptions, (usuario, senha, done) => {
  model.usuario.findOne({where: {usuario: usuario}})
    .then(user => {
      if (user.senha === senha)
        return done(null, user);
      return done(null, false, {error: "usuario ou senha inválidos."});
    }).catch(err => {
      return done(err);
    });
});

var jwtOptions = {jwtFromRequest: extractJwt.fromAuthHeader(), secretOrKey: 'sapo'};
var jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  model.usuario.findById(payload._id)
    .then(user => {
      if (user)
        done(null, user);
      done(null, false);
    }).catch(err => {
      return done(err, false);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
