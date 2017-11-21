var express = require('express');
var Sequelize = require('sequelize');
var app = express();
var bodyParser = require('body-parser');
 // get an instance of the express Router

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images',express.static('images'));
app.use(express.static('./build'))

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function(req, res) {
  console.log(req.body);
    res.json({ message: 'hooray! welcome to our api!' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

// ROUTES FOR OUR API
// =============================================================================


var sequelize = new Sequelize('database', 'username', 'password',  {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './server/database/rioverde.db',
    define: {
        timestamps: false // true by default
    },
    logging: false
});

var db = require('./db')(sequelize);
// user table config
var users = require('./users')(db.User);
app.use('/api/users',users);

// product table config
var products = require('./products')(db.Product,db.Category);
app.use('/api/products',products);
// category table config
var category = require('./category')(db.Category);
app.use('/api/category',category);




var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

      console.log('Server listening at port: 8080')
});
