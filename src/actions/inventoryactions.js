import * as types from '../constants/InventoryActionTypes';
import axios from 'axios';
import { routerActions } from 'react-router-redux'
import * as supplieractions from './addnewsupplieractions';
import * as productsActions from './addnewproductactions';

export let openStockIn = () => {
    return (dispatcher,getState) => {
      dispatcher( {
        type: types.OPEN_STOCK_IN_MODAL_SUCCESS,
      });
      dispatcher(supplieractions.getSuppliers());
      dispatcher(productsActions.getProducts());
      dispatcher(setDefaultProduct());
    }
  }

export let closeStockIn = () => {
  return (dispatcher,getState) => {
      dispatcher( {
        type: types.CLOSE_STOCK_IN_MODAL_SUCCESS,
      });
  }
}

export let setDefaultProduct = () => {
    return (dispatcher,getState) => {
      let{inventory, newproduct} = getState();
      newproduct.data[0].rowIndex = 0;
      inventory.data[0] = newproduct.data[0];
      dispatcher({
      type:types.SET_DEFAULT_PRODUCT,
      inventory
      });
  }
}

export let addRows = () => {
    return (dispatcher,getState) => {
      let {inventory, newproduct} = getState();
      inventory.data.push( newproduct.data[0]);
      dispatcher({
        type:types.ADD_MORE_ROWS_SUCCESS,
        inventory
      })
    }
}

export let deleteRows = () => {
  console.log();
    return (dispatcher,getState) => {
      let {inventory} = getState();
      inventory.data.splice(0,1);
      dispatcher({
        type:types.DELETE_ROWS_SUCCESS,
        inventory
      })
    }
  
}

export let changeProduct = (productIndex,inventoryIndex) => {
  return (dispatcher,getState) => {
    var { inventory,newproduct } = getState();
    inventory.data[inventoryIndex] = newproduct.data[productIndex];
    
  dispatcher({
    type:types.SELECT_PRODUCT_FIELD_CHANGE,
    inventory
  })
  }

  }
  






