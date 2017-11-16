var Sequelize = require('sequelize');

module.exports = function (sequelize) {


  //====================User====================\\

  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    contactNo: {
      type: Sequelize.INTEGER
    },
    gender: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    userName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  // force: true will drop the table if it already exists
  User.sync({force: false}).then(function() {
    User.create({
         firstName: 'Carlo',
         lastName: 'Lapinig',
         gender: 'Male',
         username: 'admin',
         role: 'Admin',
         password: '12345',
         status: true
     });
  }).catch(function (err) {
    console.log("Admin already created");
  })

  //====================User====================\\


  return {
    User: User,
  }

}
