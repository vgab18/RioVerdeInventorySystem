var Sequelize = require('sequelize');
var express = require('express');
var router = express();

module.exports = function (User) {

  router.get('/',function (req,res) {
    User.findAll()
      .then(function (users) {
        console.log(users);
        res.send(200).json(users)
      }).catch(function (err) {
        res.sendStatus(404);
      });
  })

  return router

}
