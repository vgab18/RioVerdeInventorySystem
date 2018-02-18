var express = require('express');
var passport = require('passport')
var auth = require('basic-auth')

var router = express.Router();

module.exports = function (passport) {


  // create the login get and post routes

  router.get('/authenticatedAccount', function (req,res) {
    if (!req.user) {
      res.sendStatus(401)
    }else {
      res.status(200).json(req.user)
    }
  })

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
