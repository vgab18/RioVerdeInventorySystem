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
      type: Sequelize.STRING,
      unique:true,
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
         address:'Pob.Ibabao Loay, Bohol',
         contactNo:'0909218862',
         gender: 'Male',
         userName: 'admin',
         password: '12345',
         role: 'admin',
         status: true
     });
  }).catch(function (err) {
    console.log("Admin already created");
  })

  //====================User====================\\

  //====================Product====================\\

  const Product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    stockName: {
      type: Sequelize.STRING,
      unique:true
    },
    categoryId: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.FLOAT
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    unit: {
      type: Sequelize.STRING
    },
    timeFrame: {
      type: Sequelize.DATE
    },
    totalAmount: {
      type: Sequelize.FLOAT
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });


  Product.sync({force: false})

  //====================Product====================\\

  //====================Category====================\\

  const Category = sequelize.define('category', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    categoryName: {
      type: Sequelize.STRING,
      unique:true
    },
  });


  Category.sync({force: false})

  // Category.hasMany(Product);
  Product.belongsTo(Category);

  //====================Supplier====================\\

  const Supplier = sequelize.define('supplier',{
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
    company: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    contactNo: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  Supplier.sync({force: false})



  //===================Inventory==================\\
 
  const Inventory = sequelize.define('supplier',{
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    stockName: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    unit: {
      type: Sequelize.STRING
    },
    categoryName: {
      type: Sequelize.STRING
    },
    totalamount: {
      type: Sequelize.INTEGER
    },
    timeframe: {
      type: Sequelize.DATE
    },
  })

  Inventory.sync({force: false})

  Category.belongsTo(Inventory);

  return {
    User: User,
    Product: Product,
    Category: Category,
    Supplier: Supplier,

  }

}
