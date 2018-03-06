import * as types from '../constants/InventoryActionTypes';
import axios from 'axios';
import { routerActions } from 'react-router-redux'
import * as supplieractions from './addnewsupplieractions';
import * as productsActions from './addnewproductactions';
import _ from 'lodash'

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
        stockName: newproduct.data[inventory.selectedProduct].stockName,
        categoryname: newproduct.data[inventory.selectedProduct].category.categoryName,
        price: inventory.price,
        quantity: inventory.quantity,
        unit: newproduct.data[inventory.selectedProduct].unit,
        totalAmount: inventory.price*inventory.quantity,
        supplierId: addsupplier.data[inventory.selectedSupplier-1].id,
        userId: auth.account.id,
        type:"IN"
      }
      inventory.inventorydata.push(data)
      dispatcher({
        type:types.ADD_MORE_ROWS_SUCCESS,
        inventorydata: inventory
      })
}
}


export let deleteRows = () => {
    return (dispatcher,getState) => {
      let {inventory} = getState();
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

  
