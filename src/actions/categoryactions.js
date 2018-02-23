import * as types from '../constants/CategoryActionTypes';
import axios from 'axios';
import * as addproductActions from './addnewproductactions';

export let getCategory = () => {
  return (dispatcher,getState) => {
    axios.get('/api/category')
    .then((category) => {

      var data = category.data;
      dispatcher(getCategorySuccess(data))
    }).catch((err) => {
      console.log(err);
    })
  }
}

export let getCategorySuccess = (data) => {
  return (dispatcher,getState) => {
    dispatcher({
      type:types.USER_GET_CATEGORY_SUCCESS,
      data
    })
    dispatcher(addproductActions.setDefaultCategory())
  }
}
