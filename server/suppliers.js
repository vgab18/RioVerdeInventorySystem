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

return router;


}
