import * as types from '../constants/NewProductActionTypes';
import _ from 'lodash';

const initialState ={
  data:[],


}
export default function categoryreducers(state=initialState,action={}) {
  switch (action.type) {
    case types.USER_GET_CATEGORY_SUCCESS:
      return _.assign({},state,{data:action.data})

    default:
    return state
  }
}
