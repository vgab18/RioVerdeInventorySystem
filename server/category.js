var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();


module.exports = function (Category) {


   //add category
  router.post('/',function (req,res,next) {

    Category.create(req.body.data)
      .then(function (category) {
        res.status(200).json(category)
      }).catch(function (err) {
        res.sendStatus(404);
      });
  })


     //find one category
    router.get('/:id',function (req,res,next) {

      Category.findById(req.params.id)
        .then(function (category) {
          res.status(200).json(category)
        }).catch(function (err) {
          res.sendStatus(404);
        });
    })

    //get all category
    router.get('/',function (req,res) {
      Category.findAll()
        .then(function (category) {
          res.json(category)
        }).catch(function (err) {
          console.log(err)
          res.sendStatus(404);
        });
    })

    //update one category
    router.put('/:id',function (req,res,next) {

      Category.findById(req.params.id)
      .then(function (category) {
        if(category === null ){
          res.sendStatus(404)
        }
        category.update(req.body.data)
        .then(function (category) {
          res.status(200).json(category)
        }).catch(function (err) {
          res.sendStatus(500)
        })
      }).catch(function (err) {
          return res.sendStatus(404);

        })
      })



  return router

}
