import * as types from '../constants/NewProductActionTypes';
import axios from 'axios';

export let getProducts = () => {
  return (dispatcher,getState) => {
    axios.get('/api/products')
    .then((products) => {

      var data = products.data;
      console.log(data);
      dispatcher(getnewProductssSuccess(data))
    }).catch((err) => {
      console.log(err);
    })
  }
}

export let getnewProductssSuccess = (data) => {
  return{
    
    type:types.GET_PRODUCTS_DATA_SUCCESS,
    data
  }
}
