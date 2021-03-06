var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();


module.exports = function (Product,Category,sequelize,Inventory) {

  //get all products
  router.get('/',function (req,res) {

    //  sequelize.query(" SELECT p.id, c.id from products p, categories c where p.categoryId=c.id", {type: sequelize.QueryTypes.SELECT})
    //   .then(function (products) {
    //     res.status(200).json(products)
    //   }).catch(function (err) {
    //     console.log(err);
      // })

    Product.findAll({
      include: [Category]
    }).then(function (products) {
        res.status(200).json(products)
    }).catch(function (err) {
        console.log(err);
        res.status(500)
    })

  })
   //add products
  router.post('/',function (req,res,next) {
    console.log(req.body);
    Product.create(req.body.data)
      .then(function (products) {
          Inventory.create({
            productId: products.id,
            categoryId: products.categoryId,
            price: 0,
            quantity: 0,
            totalamount: 0,
          })
      }).catch(function (err) {
        console.log(err);
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
