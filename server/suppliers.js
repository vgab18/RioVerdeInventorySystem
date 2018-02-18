var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();


module.exports = function(Supplier) {

  router.post('/',function (req,res,next) {

  //add supplier
    Supplier.create(req.body.data)
      .then(function (suppliers) {
        res.status(200).json(suppliers)
      }).catch(function (err) {
        res.sendStatus(404);
      });
  })

  //get data from supplier
  router.get('/',function (req,res) {
    Supplier.findAll()
      .then(function (suppliers) {
        res.json(suppliers)
      }).catch(function (err) {
        res.sendStatus(404);
      });
  })

  //find one account
 router.get('/:id',function (req,res,next) {

   Supplier.findById(req.params.id)
     .then(function (suppliers) {
       res.status(200).json(suppliers)
     }).catch(function (err) {
       res.sendStatus(404);
     });
 })

 //update one accounts
 router.put('/:id',function (req,res,next) {

   Supplier.findById(req.params.id)
   .then(function (suppliers) {
     if(suppliers === null ){
       res.sendStatus(404)
     }
     suppliers.update(req.body.data)
     .then(function (suppliers) {
       res.status(200).json(suppliers)
     }).catch(function (err) {
       res.sendStatus(500)
     })
   }).catch(function (err) {
       return res.sendStatus(404);

     })
   })

return router;


}
