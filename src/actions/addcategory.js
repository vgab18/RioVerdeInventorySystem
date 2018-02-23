import * as types from '../constants/AddCategoryActionTypes';
import axios from 'axios';
import { routerActions } from 'react-router-redux'

export let openAddcategory = () => {
  return {
    type: types.ADDCATEGORY_OPEN_MODAL_SUCCESS,
  }
}

export let closeAddcategory = () => {
  return{
    type: types.ADDCATEGORY_CLOSE_MODAL_SUCCESS,
  }
}

export let handleChangeCategory = (name,value) => {
  return (dispatcher,getState) => {
    var { addcategory } = getState();

  addcategory[name] = value;

  dispatcher({
    type: types.ADD_CATEGORY_FIELD_CHANGE,
    addcategory
  })

  }
}

export let addCategory = () => {
  return (dispatcher,getState) => {
    let{addcategory} = getState();

    let data ={
    categoryName:addcategory.categoryName,
      open:false
    }

    axios.post('/api/category',{
      data
    })
    .then((category) => {
      dispatcher(this.addCategorySuccess())


    }).catch((err) => {
      console.log(err);
    })
  }
}


export let addCategorySuccess = () => {
  return{
    type:types.ADD_CATEGORY_SUCCESS,
  }
}


export let getCategoryData = (id) => {
  return (dispatcher,getState) => {
    axios.get('/api/category/'+id)
    .then((category) => {
      dispatcher(EditToTrue(id));
      dispatcher(getCategoryDataSucess(category.data));
    })
  }
}

export let getCategoryDataSucess = (data) => {
  return{
    type:types.ADD_CATEGORY_GET_DATA,
    data,
  }
}

export let EditToTrue = (id) => {
  return{
    type:types.ADD_CATEGORY_EDIT,
    id
  }
}

export let saveCategory = () => {
  return((dispatcher,getState) => {
    let {id} = getState().addcategory;
    let {addcategory}  = getState();

    let data = {
      categoryName:addcategory.categoryName,
      open:false,
      status: true
    }
    axios.put('/api/category/'+id,{data})
    .then((category) => {
      let data = category.data;
      dispatcher(this.saveCategorySuccess())
    })
  })
}

export let saveCategorySuccess = () => {
  return{
    type:types.ADD_CATEGORY_SAVE_DATA
  }
}

export let getCategories = () => {
  return  (dispatcher,getState) => {
    axios.get('/api/category')
    .then((category) => {
      var data = category.data;
      dispatcher(getCategoryDataSucess(data))
    }).catch((err) => {
      console.log(err);
    })
  }
}
