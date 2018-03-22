import * as types from '../constants/NewProductActionTypes';
import axios from 'axios';
import { EAFNOSUPPORT } from 'constants';
import _ from "lodash";

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

export let handleSearch = (value,name) => {
  return(dispatcher,getState) =>{
    var {newproduct} = getState();

    let source = newproduct.data

    let filteredSearch = _.map(source,(value) => {
      if(value.stockName.includes(value)){
        return value
      }
    })

    filteredSearch = _.without(filteredSearch, undefined)

    if(filteredSearch.length !==0){
      dispatcher(searchProductFound(filteredSearch))
    }
  }
  }

  export let handleSearchChange = (value,name) => {
    return (dispatcher,getState) => {
      var {newproduct} = getState();

      newproduct[name] = value;

      dispatcher({
        type:types.SEARCH_PRODUCT_FIELD_CHANGE,
        newproduct
      })
    }
  }


export let searchProductFound = (filteredSearch) => {
  return{
    type:types.SEARCH_PRODUCT_FOUND,
      filteredSearch
  }
  
}

  
