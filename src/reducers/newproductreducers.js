import * as types from '../constants/NewProductActionTypes';
import _ from 'lodash';

const initialState ={
  data:[],
  productdata:[],
  searchProduct:''


}
export default function newproductreducers(state=initialState,action={}) {
  switch (action.type) {
    case types.GET_PRODUCTS_DATA_SUCCESS:
      return _.assign({},state,{
          data:action.data,
          productdata:action.data})

    case types.SEARCH_PRODUCT_FOUND:
      return _.assign({},
              state, action.productdata)

    case types.SEARCH_PRODUCT_FIELD_CHANGE:
      return _.assign({},
                state, action.newproduct)
    default:
    return state
  }
}
