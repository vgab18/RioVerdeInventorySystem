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
  edit:false,
  data:[]

}


export default function addsupplierreducers(state=initialState, action={}) {

switch (action.type) {
  case types.OPEN_ADD_NEW_SUPPLIER_MODAL:
    return _.assign({},state,{open:true})

  case types.CLOSE_ADD_NEW_SUPPLIER_MODAL:
    return _.assign({},state,{
      firstName:'',
      lastName:'',
      company:'',
      address:'',
      contactNo:'',
      edit:false,
      open:false})

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

  case types.EDIT_SUPPLER_DATA_SUCCESS:
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
  return _.assign({},
    state,
    action.data,
    {
      edit:false,
      open:false,
    }
  )

  case types.OPEN_ADD_NEW_SUPPLIER_MODAL_FIELD_CHANGE:
    return _.assign({},state,action.addsupplier)

  case types.GET_SUPPLIERS_DATA_SUCCESS:
    return _.assign({},state,{data:action.data})

  case types.OPEN_EDIT_SUPPLIER_DATA_MODAL:
    return _.assign({},
    state,
    {
      edit:true,
      open:true,
      id: action.id,
    })

  case types.GET_SELECTED_SUPPLIER_DATA:
    return _.assign({},
      state,
      action.data,
    )

  case types.CHOOSE_SUPPLIER_FIELD_CHANGE:
    return _.assign({},state,action.addsupplier)



    default:
      return state;


}



}
