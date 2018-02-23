var express = require('express');
var Sequelize = require('sequelize');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local');
var uuid = require('uuid');
var cookieParser = require('cookie-parser');
var Op = Sequelize.Op;

 // get an instance of the express Router

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images',express.static('images'));
app.use(express.static('./build'))
app.use(cookieParser('inventory'));

app.use(session({
  genid: (req) => {
    return uuid()
  },
  secret:'inventory',
  resave:false,
  saveUninitialized: true,
  store: new FileStore()
}))
app.use(passport.initialize())
app.use(passport.session())

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
app.use(passport.initialize())
app.use(passport.session())

var db = require('./db')(sequelize);

passport.use(new LocalStrategy(
  {
    usernameField:'userName',
    passwordField:'password'
  },
  (username,password,done) => {
    let User = db.User;
    User.findOne({
      where:{
        [Op.and] : [{userName:username},{password:password}]
      }
    }).then(function (user) {
      if(user) {
        done(null,user)
      }
      else{
        done(null,false)
      }
    }).catch((err) => {
      done(err,false)
    })
  }
))

passport.serializeUser(function (user,done) {
  done(null,user.id)
})

passport.deserializeUser(function (id,done) {
  var User = db.User;
  User.findById(id).then(function (user) {
    done(null,user)
  }).catch((err) => {
    done(err,false)
  })
})

var auth = require('./auth')(passport);
app.use('/api',auth);

// product table config
var products = require('./products')(db.Product,db.Category,sequelize);
app.use('/api/products',products);

// category table config
var category = require('./category')(db.Category);
app.use('/api/category',category);

// supplier tabale config
var suppliers = require('./suppliers')(db.Supplier);
app.use('/api/suppliers',suppliers);

// user table config
var users = require('./users')(db.User);
app.use('/api/users',users);



var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

      console.log('Server listening at port: 8080')
});
