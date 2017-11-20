import * as types from '../constants/AddUserActionTypes';
import _ from 'lodash';


const initialState ={
  edit:false,
  firstName:'',
  lastName:'',
  address:'',
  contactNo:'',
  gender:'Male',
  userName:'',
  password:'',
  role:'Staff',
  status:true,
  seepassword: '',

  open:false
}

export default function adduserreducers(state=initialState,action={}){
  switch (action.type) {
    case types.ADDUSER_OPEN_MODAL_SUCCESS:
      return _.assign({},state,{open:true})

    case types.ADDUSER_CLOSE_MODAL_SUCCESS:
      return _.assign({},state,{open:false,
      edit:false,
      firstName:'',
      lastName:'',
      address:'',
      contactNo:'',
      gender:'',
      userName:'',
      password:'',
      role:'Staff',
      status:true,
      open: false})

    case types.ADD_USER_FIELD_CHANGE:
    return _.assign({},state,action.adduser)

    case types.ADD_USER_SUCCESS:
      return{
          edit:false,
          firstName:'',
          lastName:'',
          address:'',
          contactNo:'',
          gender:'',
          userName:'',
          password:'',
          role:'Staff',
          status:true,
          open: false
    }

    case types.ADD_USER_EDIT:
      return _.assign({},
      state,
      {
        edit:true,
        open:true,
        id: action.id,
      }
    )

    case types.ADD_USER_GET_DATA:
      return _.assign({},
        state,
        action.data
      )

    case types.ADD_USER_SAVE_DATA:
      return{
        edit:false,
        firstName:'',
        lastName:'',
        address:'',
        contactNo:'',
        gender:'',
        userName:'',
        password:'',
        role:'Staff',
        status:true,
        open: false
      }

    default:
    return state

  }
}
