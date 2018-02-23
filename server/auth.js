var express = require('express');
var passport = require('passport');
var router = express.Router();

module.exports = function (passport) {

  router.get('/account', function (req,res) {
    if (!req.user) {
      //no authenticated account
      res.sendStatus(401)
    }else {
      //send the authenticated account
      res.status(200).json(req.user)
    }
  })

  //this is where authentication happens
  router.post('/authentication',
    passport.authenticate('local'),(req,res) => {
      res.send("OK")
    }
  )

  router.post('/logout', function(req, res) {
        req.logout();
        res.send("OK");
    });

  return router;

}
