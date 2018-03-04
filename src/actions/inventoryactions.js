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
      let {inventory, newproduct} = getState();
      const product = newproduct.data[0]
      product.index = 0
      inventory.data.push( product);
      dispatcher({
        type:types.ADD_MORE_ROWS_SUCCESS,
        inventory
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

// export let getProduct = (id) => {
//     return (dispatcher,getState) => {
//       axios.get('api/products'+id)
//       .then((products) => {

//       })
//     }
// }

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

// export const addProductIntoRow = () => {
//     return (dispatcher, getState) => {
    
//     let product = {}

//     product.stockName = 
      
//     }
// }; 

  






