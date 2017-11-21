import * as types from '../constants/AddNewProductActionTypes';
import axios from 'axios';
import { routerActions } from 'react-router-redux'

export let openAddproduct = () => {
  return {
    type: types.ADD_NEW_PRODUCT_OPEN_MODAL_SUCCESS,
  }
}

export let closeAddproduct = () => {
  return{
    type: types.ADD_NEW_PRODUCT_CLOSE_MODAL_SUCCESS,
  }
}

export let handleChangenewProduct = (name,value) => {
  return (dispatcher,getState) => {
    var { addproduct } = getState();

  addproduct[name] = value;

  dispatcher({
    type: types.ADD_NEW_PRODUCT_FIELD_CHANGE,
    addproduct
  })

  }
}


export let addProduct = () => {
  return (dispatcher,getState) => {
    let{addproduct} = getState();

    let data ={
      categoryName:addProduct.categoryName,
      stockName:addproduct.stockName,
      unit:addproduct.unit,
      timeFrame:new Date()
    }

    axios.post('/api/products',{
      data
    })
    .then((products) => {
      dispatcher(this.addNewProductSuccess())


    }).catch((err) => {
      console.log(err);
    })
  }
}


export let addNewProductSuccess = () => {
  return{
    type:types.ADD_NEWPRODUCT_SUCCESS,
  }
}


export let getNewProductData = (id) => {
  return (dispatcher,getState) => {
    axios.get('/api/products/'+id)
    .then((products) => {
      dispatcher(EditToTrue());
      dispatcher(getNewProductDataSucess(products.data));
    })
  }
}

export let getNewProductDataSucess = (data,id) => {
  return{
    type:types.ADD_NEW_PRODUCT_GET_DATA,
    data,
  }
}


export let EditToTrue = (id) => {
  return{
    type:types.ADD_NEWPRODUCT_SUCCESS_EDIT,
    id
  }
}

export let saveNewProduct = () => {
  return((dispatcher,getState) => {
    let {id} = getState().addproduct;
    let {addproduct}  = getState();

    let data = {
      categoryName:addProduct.categoryName,
      stockName:addproduct.stockName,
      unit:addproduct.unit,
      timeFrame:new Date()
    }
    axios.put('/api/products/'+id,{data})
    .then((products) => {
      let data = products.data;
      dispatcher(this.saveNewProductSuccess())
      dispatcher(routerActions.push("/products"))
    })
  })
}

export let saveNewProductSuccess = () => {
  return{
    type:types.ADD_NEWPRODUCT_SAVE_DATA
  }
}