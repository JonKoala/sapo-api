var passport = require('passport')
var jwtStrategy = require('./jwt-strategy')

passport.use(jwtStrategy);

var initialize = () => { return passport.initialize(); };
var jwtAuthenticate = () => { return passport.authenticate("jwt", {session: false}); }

module.exports.initialize = initialize;
module.exports.authenticate = jwtAuthenticate;
