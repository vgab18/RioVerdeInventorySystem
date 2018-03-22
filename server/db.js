
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
    unit: {
      type: Sequelize.STRING
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
   supplierId: {
     type: Sequelize.STRING
   }
  });



  Category.sync({force: false})

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



  //===================Product History==================\\

  const ProductHistory = sequelize.define('ProductHistory',{
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: Sequelize.STRING
    },
    categoryId: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.DOUBLE
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    totalamount: {
      type: Sequelize.DOUBLE
    },
    userId: {
      type: Sequelize.INTEGER
    },
    actionType: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    }

  })

  ProductHistory.sync({force: false})


  ///====================Inventory===================\\\

  const Inventory = sequelize.define('Inventory',{
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: Sequelize.STRING
    },
    categoryId: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.DOUBLE
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    totalamount: {
      type: Sequelize.DOUBLE
    },

  })


  ///====================Transaction History===================\\\

  const TransacHistory = sequelize.define('TransacHistory',{
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: Sequelize.STRING
    },
    categoryId: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.DOUBLE
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    totalamount: {
      type: Sequelize.DOUBLE
    },
    date: {
      type: Sequelize.DATE
    },
    supplierId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      type: Sequelize.DATE
    }

  })
  TransacHistory.sync({force: false})

  Inventory.sync({force: false})

  Inventory.belongsTo(Product)
  Inventory.belongsTo(Category)

  ProductHistory.belongsTo(Product)
  ProductHistory.belongsTo(Category)
  ProductHistory.belongsTo(User)

  TransacHistory.belongsTo(Supplier)
  TransacHistory.belongsTo(Product)
  TransacHistory.belongsTo(Category)
  TransacHistory.belongsTo(User)



  return {
    User: User,
    Product: Product,
    Category: Category,
    Supplier: Supplier,
    Inventory: Inventory,
    ProductHistory: ProductHistory,
    TransacHistory: TransacHistory

  }

}
