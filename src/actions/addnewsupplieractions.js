import * as types from '../constants/AddNewSupplierActionTypes.js';
import axios from 'axios';
import { routerActions } from 'react-router-redux'

export let OpenAddSupplierModal = () => {

return {
  type:types.OPEN_ADD_NEW_SUPPLIER_MODAL
  }
}

export let CloseAddSupplierModal = () => {

 return {
   type:types.CLOSE_ADD_NEW_SUPPLIER_MODAL
 }
}

export let handleChange = (name,value) => {
  return (dispatcher,getState) => {
    var { addsupplier } = getState();

  addsupplier[name] = value;

  dispatcher({
    type:types.ADD_NEW_SUPPLIER_FIELD_CHANGE,
    addsupplier
  })
  }
}


export let addSupplier = () => {
  return (dispatcher,getState) => {
    let{addsupplier} = getState();

    let data ={
      firstName: addsupplier.firstName,
      lastName: addsupplier.lastName,
      company: addsupplier.company,
      address: addsupplier.address,
      contactNo:addsupplier.contactNo,
      status: true
    }

    axios.post('/api/suppliers',{
      data
    })
    .then((users) => {
      dispatcher(this.addSupplierSuccess())


    }).catch((err) => {
      console.log(err);
    })
  }
}

export let addSupplierSuccess = () => {
  return{
    type:types.ADD_NEW_SUPPLIER_SUCCESS,
  }
}

export let getSupplierData = (id) => {
  return (dispatcher,getState) => {
    axios.get('/api/suppliers/'+id)
    .then((users) => {
      dispatcher(getSupplierDataSucess(users.data));
    })
  }
}

export let getSupplierDataSucess = (data,id) => {
  return{
    type:types.ADD_SUPPLIER_GET_DATA,
    data,
  }
}


export let getSuppliers = () => {
  return  (dispatcher,getState) => {
    axios.get('/api/suppliers')
    .then((suppliers) => {
      dispatcher(getSuppliersSuccess(suppliers.data));
    })
  }
}

export let getSuppliersSuccess = (data) => {
  return{
    type:types.GET_SUPPLIERS_DATA_SUCCESS,
    data
  }

}
