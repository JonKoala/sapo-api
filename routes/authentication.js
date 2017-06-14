var jwt = require('jsonwebtoken')
var crypto = require('crypto')
var express = require('express')
var router = express.Router();
var model = require('../models')

function generateToken(user) {
  return jwt.sign(user, 'sapo', {
    expiresIn: 10080
  });
}

function setUserInfo(user) {
  return {
    id: user.id,
    name: user.nome
  };
}

router.post('/', (req, res) => {
  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
});

module.exports = router;

/*
http://blog.slatepeak.com/building-a-basic-restful-api-for-a-chat-system/
http://blog.slatepeak.com/creating-a-simple-node-express-api-authentication-system-with-passport-and-jwt/
http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/
	(And finally, allow passport to use the strategies we defined)
*/
