import * as types from '../constants/UserActionTypes';
import _ from 'lodash';

const initialState ={
  data:[],


}
export default function userreducers(state=initialState,action={}) {
  switch (action.type) {
    case types.GET_USERS_DATA_SUCCESS:
      return _.assign({},state,{data:action.data})

    default:
    return state
  }
}
