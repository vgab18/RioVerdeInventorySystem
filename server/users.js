var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();


module.exports = function (User) {

  //get all account
  router.get('/',function (req,res) {
    User.findAll()
      .then(function (users) {
        console.log(users);
        res.json(users)
      }).catch(function (err) {
        res.sendStatus(404);
      });
  })
   //add accounts
  router.post('/',function (req,res,next) {
    // console.log(req);

    User.create(req.body.data)
      .then(function (users) {
        res.status(200).json(users)
      }).catch(function (err) {
        res.sendStatus(404);
      });
  })

   //find one account
  router.get('/:id',function (req,res,next) {
    console.log(req.body.data);

    User.findById(req.params.id)
      .then(function (users) {
        res.status(200).json(users)
      }).catch(function (err) {
        res.sendStatus(404);
      });
  })

    //update one accounts
    router.put('/:id',function (req,res,next) {

      User.findById(req.params.id)
      .then(function (users) {
        if(users === null ){
          res.sendStatus(404)
        }
        users.update(req.body)
        .then(function (users) {
          return res.sendStatus(200).json(users)
        }).catch(function (err) {
          return res.sendStatus(500)
        })
      }).catch(function (err) {
          return res.sendStatus(404);

        })
      })


  return router

}
