import * as types from '../constants/AddUserActionTypes';
import axios from 'axios';
import { routerActions } from 'react-router-redux'

export let openAddUser = () => {
  return {
    type: types.ADDUSER_OPEN_MODAL_SUCCESS,
  }
}

export let closeAdduser = () => {
  return{
    type:types.ADDUSER_CLOSE_MODAL_SUCCESS,
  }
}

export let handleChange = (name,value) => {
  return (dispatcher,getState) => {
    var { adduser } = getState();

  adduser[name] = value;

  dispatcher({
    type:types.ADD_USER_FIELD_CHANGE,
    adduser
  })

  }
}
export let addUser = () => {
  return (dispatcher,getState) => {
    let{adduser} = getState();

    let data ={
      firstName: adduser.firstName,
      lastName: adduser.lastName,
      address: adduser.address,
      contactNo:adduser.contactNo,
      gender: adduser.gender,
      userName: adduser.userName,
      password: adduser.password,
      role: adduser.role,
      status: true
    }

    axios.post('/api/users',{
      data
    })
    .then((users) => {
      dispatcher(this.addUserSuccess())


    }).catch((err) => {
      console.log(err);
    })
  }
}

export let addUserSuccess = () => {
  return{
    type:types.ADD_USER_SUCCESS,
  }
}

export let getUserData = (id) => {
  return (dispatcher,getState) => {
    axios.get('/api/users/'+id)
    .then((users) => {
      dispatcher(setEditToTrue());
      dispatcher(getUsersDataSucess(users.data));
    })
  }
}

export let getUsersDataSucess = (data,id) => {
  return{
    type:types.ADD_USER_GET_DATA,
    data,
  }
}

export let setEditToTrue = (id) => {
  return{
    type:types.ADD_USER_EDIT,
    id
  }
}

export let saveUser = () => {
  return((dispatcher,getState) => {
    let {id} = getState().adduser;
    let {adduser}  = getState();

    let data = {
      firstName: adduser.firstName,
      lastName: adduser.lastName,
      address: adduser.address,
      contactNo:adduser.contactNo,
      gender: adduser.gender,
      userName: adduser.userName,
      password: adduser.password,
      role: adduser.role,
      status: true
    }
    axios.put('/api/users/'+id,{data})
    .then((users) => {
      let data = users.data;
      dispatcher(this.saveUserSuccess())
      dispatcher(routerActions.push("/users"))
    })
  })
}

export let saveUserSuccess = () => {
  return{
    type:types.ADD_USER_SAVE_DATA
  }
}
