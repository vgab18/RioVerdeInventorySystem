import * as types from '../constants/AuthActionTypes';
import _ from 'lodash';

const initialState={
  isAuthenticated: false,
  errors: [],
  account: null,
  logoutSuccess: false,
  loggingIn: false,
}

export default function authreducers(state=initialState,action={}) {

  switch (action.type) {
    case types.AUTH_ACCOUNT_RECEIVE:
      return _.assign({},state,{
        account: action.account,
        isAuthenticated: true,
      })
    case types.AUTH_LOGIN_PENDING:
      return _.assign({},state,{
        loggingIn: true,
      })
    case types.AUTH_LOGIN_FAILED:
      return _.assign({},state,{
        logoutSuccess: false,
      })
    case types.AUTH_LOGOUT_SUCCESS:
      return _.assign({},state,{
        isAuthenticated: false,
        errors: [],
        account: null,
        logoutSuccess: true,
        loggingIn: false,
      })


    default:
      return state
  }
}
