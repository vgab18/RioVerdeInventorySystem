import * as types from '../constants/InventoryActionTypes';
import axios from 'axios';
import { routerActions } from 'react-router-redux'
import * as supplieractions from './addnewsupplieractions';
import * as productsActions from './addnewproductactions';
import _ from 'lodash'
import { EAFNOSUPPORT } from 'constants';

export let openStockIn = () => {
    return (dispatcher,getState) => {
      dispatcher( {
        type: types.OPEN_STOCK_IN_MODAL_SUCCESS,
      });
      dispatcher(supplieractions.getSuppliers());
      dispatcher(productsActions.getProducts());
    }
  }

export let closeStockIn = () => {
  return (dispatcher,getState) => {
      dispatcher( {
        type: types.CLOSE_STOCK_IN_MODAL_SUCCESS,
      });
  }
}

export let addRows = () => {
    return (dispatcher,getState) => {
      let {inventory, newproduct, addsupplier, auth} = getState();
      let data = {
        productId: newproduct.data[inventory.selectedProduct].id,
        categoryId: newproduct.data[inventory.selectedProduct].categoryId,
        createdAt: new Date(),
        quantity: inventory.quantity,
        price: inventory.price,
        unit: newproduct.data[inventory.selectedProduct].unit,
        totalamount: inventory.price*inventory.quantity,
        supplierId: addsupplier.data[inventory.selectedSupplier-1].id,
        userId: auth.account.id,
        actionType:"IN",
        stockName: newproduct.data[inventory.selectedProduct].stockName,
        categoryName: newproduct.data[inventory.selectedProduct].category.categoryName
      }
      inventory.inventorydata.push(data)
      dispatcher({
        type:types.ADD_MORE_ROWS_SUCCESS,
        inventorydata: inventory
      })
}
}

export let saveAllRows = () => {
    return(dispatcher,getState)=>{
      let {inventory} = getState();

      let data = inventory.inventorydata

      axios.post('/api/inventory',{
        data
      }).then((inventory)=>{
        dispatcher(saveAllRowsSuccess())
      }).catch((err)=>{
        console.log(err)
      })
    }
}


export let saveAllRowsSuccess = () => {
    return (dispatcher,getState) => {


      dispatcher({
        type:types.SAVE_ALL_ROWS_DATA_SUCCESS
      })
      dispatcher(getInventory())
    }
}


export let getInventory = () => {
  return (dispatcher,getState) => {
    axios.get('/api/inventory')
    .then((inventory) => {

      var data = inventory.data;
      dispatcher(getAllInventorySuccess(data))
    }).catch((err) => {
      console.log(err);
    })
  }
}

export let getAllInventorySuccess = (data) => {
  return{
    type:types.GET_INVENTORY_DATA_SUCCESS,
    data
  }
}

export let deleteRows = (i) => {
    return (dispatcher,getState) => {
      let {inventory} = getState();

      inventory.inventorydata.splice(i,1);

      dispatcher({
        type:types.DELETE_ROWS_SUCCESS,
        inventory
      })
    }

}

export let changeProduct = (value,name) => {
  return (dispatcher,getState) => {
    var { inventory,newproduct } = getState();

    inventory[name] = parseInt(value)

  dispatcher({
    type:types.SELECT_PRODUCT_FIELD_CHANGE,
    inventory
  })
  }
  }


export let changeSupplier = (value,name) => {
  return (dispatcher,getState) => {
    var {inventory} = getState();

    inventory[name] = parseInt(value)

    dispatcher({
      type:types.SELECT_SUPPLIER_FIELD_CHANGE,
      inventory
    })
  }
}

export let handlePriceField = (value,name) => {
    return{
      type:types.ADD_ITEM_PRICE_FIELD_CHANGE,
      value
    }
}

export let handlequantityfield = (value,name) => {
  return{
    type:types.ADD_ITEM_QUANTITY_FIELD_CHANGE,
    value
  }
}
