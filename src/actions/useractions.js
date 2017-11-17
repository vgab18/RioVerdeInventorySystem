import * as types from '../constants/UserActionTypes';
import axios from 'axios';

export let getUsers = () => {
  return (dispatcher,getState) => {
    axios.get('/api/users')
    .then((users) => {

      var data = users.data;
      dispatcher(getUsersSuccess(data))
    }).catch((err) => {
      console.log(err);
    })
  }
}

export let getUsersSuccess = (data) => {
  return{
    type:types.USER_GET_ACCOUNT_SUCCESS,
    data
  }
}
