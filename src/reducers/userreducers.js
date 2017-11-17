import * as types from '../constants/UserActionTypes';
import _ from 'lodash';

const initialState ={
  data:[],


}
export default function userreducers(state=initialState,action={}) {
  switch (action.type) {
    case types.USER_GET_ACCOUNT_SUCCESS:
      return _.assign({},state,{data:action.data})

    default:
    return state
  }
}
