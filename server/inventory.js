var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();


module.exports = function (Inventory,Category,Product,User) {

     //add inventory
  router.post('/',function (req,res,next) {
    Inventory.bulkCreate(req.body.data)
      .then(function (inventory) {
        res.status(200).json(inventory)
      }).catch(function (err) {
        console.log(err);
        res.sendStatus(404);
      });
  })


   //get all inventory
   router.get('/',function (req,res) {
    Inventory.findAll({
      include:[
        Product,Category,User
      ]
    })
      .then(function (inventory) {
        res.json(inventory)
      }).catch(function (err) {
        console.log(err)
        res.sendStatus(404);
      });



    })

    return router



}
