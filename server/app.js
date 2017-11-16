var express = require('express');
var Sequelize = require('sequelize');

var app = express();

var sequelize = new Sequelize('database', 'username', 'password',  {
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

var users = require('./users')(db.User);
app.use('/api/users',users);



var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
