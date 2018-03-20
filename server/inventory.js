var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();
var co = require('co')
var _ = require('lodash')


module.exports = function (Inventory,Category,Product,User,ProductHistory,TransHistory,Supplier) {

     //add inventory
  router.post('/in',function (req,res,next) {

    co(function *() {
      var productHistory = yield ProductHistory.bulkCreate(req.body.data)

      var transHistory = yield TransHistory.bulkCreate(req.body.data)

      
      var inventoryData = _.map(req.body.data,function (element) {
        return{
          productId: element.productId,
          categoryId: element.categoryId,
          price: element.price,
          quantity: element.quantity,
          totalamount: element.totalamount,
        }
      })
      
      // var inventory = yield Inventory.bulkCreate(inventoryData)

      for (let i = 0; i < inventoryData.length; i++) {
        const data = inventoryData[i];
        Inventory.findOne({
          where: {
            productId: data.productId
          }
        }).then(function (inventory) {
          inventory.update({
            price: parseInt(data.price),
            quantity: inventory.quantity + parseInt(data.quantity),
            totalamount: inventory.totalamount + data.totalamount,
          })
        })
        
      }

      return [productHistory,transHistory,inventoryData]

    }).then(function (data) {
        res.sendStatus(200)
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500)
    })

    // Inventory.bulkCreate(req.body.data)
    //   .then(function (inventory) {
    //     res.status(200).json(inventory)
    //   }).catch(function (err) {
    //     console.log(err);
    //     res.sendStatus(404);
    //   });
  })


   //get all inventory
   router.get('/',function (req,res) {
    Inventory.findAll({
      include:[
        Product,Category
      ]
    })
      .then(function (inventory) {
        res.json(inventory)
      }).catch(function (err) {
        console.log(err)
        res.sendStatus(404);
      });

    })

    //get all producthistory
   router.get('/producthistory',function (req,res) {
    ProductHistory.findAll({
      include:[
        Product,Category,User
      ]
    })
      .then(function (productHistory) {
        res.json(productHistory)
      }).catch(function (err) {
        console.log(err)
        res.sendStatus(404);
      });

    })

    //get all transactionhistory
   router.get('/transactionhistory',function (req,res) {
    TransHistory.findAll({
      include:[
        Product,Category,User,Supplier
      ]
    })
      .then(function (productHistory) {
        res.json(productHistory)
      }).catch(function (err) {
        console.log(err)
        res.sendStatus(404);
      });

    })
    
    


    

    return router



}
