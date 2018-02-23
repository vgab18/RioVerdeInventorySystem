import * as types from '../constants/AddNewProductActionTypes';
import axios from 'axios';
import { routerActions } from 'react-router-redux'
import * as categoryActions from './categoryactions';
import { getnewProductssSuccess } from './newproductactions';

export let openAddproduct = () => {
  return (dispatcher,getState) => {
    dispatcher( {
      type: types.ADD_NEW_PRODUCT_OPEN_MODAL_SUCCESS,
    });

    dispatcher(categoryActions.getCategory())
    // dispatcher(setDefaultCategory())
    
  }
  
}

export let closeAddproduct = () => {
  return{
    type: types.ADD_NEW_PRODUCT_CLOSE_MODAL_SUCCESS,
  }
}

export let closeEditproduct = () => {
  return{
    type: types.CLOSE_EDIT_PRODUCT_DATA_MODAL,
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

export let handleEditProduct = (name,value) => {
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
      stockName:addproduct.stockName,
      categoryId:addproduct.categoryId,
      quantity:0,
      unit:addproduct.unit,
      timeFrame:new Date(),
      totalAmount:0,
      status:true,

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


export let getProductData = (id) => {
  return (dispatcher,getState) => {
    axios.get('/api/products/'+id)
    .then((products) => {
      dispatcher(EditToTrue());
      dispatcher(getSelectedProductdata(products.data));
    })
  }
}

export let getNewProductDataSucess = (data,id) => {
  return{
    type:types.ADD_NEW_PRODUCT_GET_DATA,
    data,
  }
}

export let getSelectedProductdata = (data) => {
  return{
    type: types.GET_SELECTED_PRODUCT_DATA,
    data
  }
}


export let EditToTrue = (id) => {
  return{
    type:types.OPEN_EDIT_PRODUCT_DATA_MODAL,
    id
  }
}

export let saveNewProduct = () => {
  return((dispatcher,getState) => {
    let {id} = getState().addproduct;
    let {addproduct}  = getState();

    let data = {
      stockName:addproduct.stockName,
      categoryName:addproduct.categoryName,
      quantity:0,
      unit:'',
      timeFrame:new Date(),
      totalAmount:0,
      status:true,
      category:{},
      open:false
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

export let handleChange = (name,value) => {
  return (dispatcher,getState) => {
    var { addproduct } = getState();

  addproduct[name] = value;

  dispatcher({
    type:types.ADD_NEW_PRODUCT_FIELD_CHANGE,
    addproduct
  })
  }
}

export let  setDefaultCategory = () => {
  return(dispatcher,getState)=>{
    let{addproduct, category} = getState();
    addproduct.categoryId = category.data[0].id;
    dispatcher({
      type:types.ADD_NEW_PRODUCT_SET_DEFAULT_CATEGORY,
      addproduct
    })
  }
}

export let getProducts = () => {
  return  (dispatcher,getState) => {
    axios.get('/api/products')
    .then((products) => {
      var data = products.data;
      dispatcher(getnewProductssSuccess(data))
    }).catch((err) => {
      console.log(err);
    })
  }
}
