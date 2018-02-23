import * as types from '../constants/InventoryActionTypes';
import axios from 'axios';
import { routerActions } from 'react-router-redux'
import * as supplieractions from './addnewsupplieractions';

export let openStockIn = () => {
    return (dispatcher,getState) => {
      dispatcher( {
        type: types.OPEN_STOCK_IN_MODAL_SUCCESS,
      });
      dispatcher(supplieractions.getSuppliers())
    }
  }

export let closeStockIn = () => {
return (dispatcher,getState) => {
    dispatcher( {
    type: types.CLOSE_STOCK_IN_MODAL_SUCCESS,
    });
}
}


