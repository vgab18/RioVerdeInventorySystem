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
    type:types.OPEN_ADD_NEW_SUPPLIER_MODAL_FIELD_CHANGE,
    addsupplier
  })
  }
}


export let addSupplier = () => {
  return (dispatcher,getState) => {
    let{addsupplier} = getState();

    let data ={
      id: addsupplier.id,
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

export let editSupplierDataSuccess = () => {
  return{
    type:types.EDIT_SUPPLER_DATA_SUCCESS
  }
}

export let saveSupplier = () => {
  return((dispatcher,getState) => {
    let {id} = getState().addsupplier;
    let {addsupplier}  = getState();

    let data = {
      firstName: addsupplier.firstName,
      lastName: addsupplier.lastName,
      company: addsupplier.company,
      address:addsupplier.address,
      contactNo: addsupplier.contactNo,
    }
    axios.put('/api/suppliers/'+id,{data})
    .then((suppliers) => {
      let data = suppliers.data;
      dispatcher(editSupplierDataSuccess())
    })
  })
}

export let getSupplierData = (id) => {
  return (dispatcher,getState) => {
    axios.get('/api/suppliers/'+id)
    .then((suppliers) => {
      dispatcher(setEditToTrue(suppliers.data));
      dispatcher(saveSupplierDataSuccess(suppliers.data));
    })
  }
}

export let saveSupplierDataSuccess = (data,id) => {
  return{
    type:types.GET_SELECTED_SUPPLIER_DATA,
    data,
  }
}


export let getSuppliers = () => {
  return  (dispatcher,getState) => {
    axios.get('/api/suppliers')
    .then((suppliers) => {
      var data = suppliers.data;
      dispatcher(getSuppliersSuccess(data))
    }).catch((err) => {
      console.log(err);
    })
  }
}

export let getSuppliersSuccess = (data) => {
  return{
    type:types.GET_SUPPLIERS_DATA_SUCCESS,
    data
  }

}

export let setEditToTrue = (id) => {
  return{
    type:types.OPEN_EDIT_SUPPLIER_DATA_MODAL,
    id
  }
}

export let handleChangeSupplierField = (name,value) => {
  return (dispatcher,getState) => {
    var { addsupplier } = getState();


  addsupplier[name] = value;

  dispatcher({
    type: types.CHOOSE_SUPPLIER_FIELD_CHANGE,
    addsupplier
  })

  }
}
