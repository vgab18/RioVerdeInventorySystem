import * as types from '../constants/AddNewSupplierActionTypes.js';
import _ from 'lodash';

const initialState = {
  firstName:'',
  lastName:'',
  company:'',
  address:'',
  contactNo:'',
  status:true,
  open:false,
  data:[]

}


export default function addsupplierreducers(state=initialState, action={}) {

switch (action.type) {
  case types.OPEN_ADD_NEW_SUPPLIER_MODAL:
    return _.assign({},state,{open:true})

  case types.CLOSE_ADD_NEW_SUPPLIER_MODAL:
    return _.assign({},state,{open:false})
  case types.ADD_NEW_SUPPLIER_SUCCESS:
  return{
      firstName:'',
      lastName:'',
      company:'',
      address:'',
      contactNo:'',
      status:true,
      open: false,
      data:[]
    }

    case types.ADD_SUPPLIER_SAVE_DATA:
    return{
        firstName:'',
        lastName:'',
        company:'',
        address:'',
        contactNo:'',
        status:true,
        open: false,
        data:[]
      }
  case types.ADD_NEW_SUPPLIER_FIELD_CHANGE:
    return _.assign({},state,action.addsupplier)

    case types.GET_SUPPLIERS_DATA_SUCCESS:
    return _.assign({},state,{data:action.data})

    default:
      return state;


}



}
