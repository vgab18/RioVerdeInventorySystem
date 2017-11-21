var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();


module.exports = function (Product,Category) {

  //get all products
  router.get('/',function (req,res) {
    Product.findAll()
      .then(function (products) {
        res.json(products)
      }).catch(function (err) {
        res.sendStatus(404);
      });
  })
   //add products
  router.post('/',function (req,res,next) {

    Product.create(req.body.data)
      .then(function (products) {
        res.status(200).json(products)
      }).catch(function (err) {
        res.sendStatus(404);
      });

})

   //find one products
  router.get('/:id',function (req,res,next) {

    Product.findById(req.params.id)
      .then(function (products) {
        res.status(200).json(products)
      }).catch(function (err) {
        res.sendStatus(404);
      });
  })

    //update one products
    router.put('/:id',function (req,res,next) {

      Product.findById(req.params.id)
      .then(function (products) {
        if(products === null ){
          res.sendStatus(404)
        }
        products.update(req.body.data)
        .then(function (products) {
          res.status(200).json(products)
        }).catch(function (err) {
          res.sendStatus(500)
        })
      }).catch(function (err) {
          return res.sendStatus(404);

        })
      })


  return router

}