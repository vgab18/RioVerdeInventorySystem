import * as types from '../constants/AuthActionTypes';
import {post,get} from '../utils/RestClient';
import {routerActions} from 'react-router-redux';
import * as authUtils from '../utils/AuthUtils';


export let login = (state,target) => {
  return (dispatcher,getState) => {
    post('/api/authentication',{},{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params:state
    }).then((response) => {
      dispatcher({
        type: types.AUTH_LOGIN_PENDING
      })
      dispatcher(loginSuccess(target))
    }).catch((err) => {
      dispatcher(loginFailed())
    })
  }
}

export let loginSuccess = (target) => {
  return (dispatcher, getState) => {
    get('/api/account')
      .then((account) => {
        let {router} = getState();
        // var target = router.location.query.target;
        dispatcher(accountReceived(account.data));

        if (target) {
          dispatcher(routerActions.push(target))
        }else{
            if(account.data.role === "admin")
              return  dispatcher(routerActions.push("/users"))
            else if(account.data.role === "Staff")
              return  dispatcher(routerActions.push("/inventory"))
            else if(account.data.role === "kitchen")
              return  dispatcher(routerActions.push("/kitchenrequest"))
            else
              return dispatcher(routerActions.push("/users"))
          
         
          // dispatcher(routerActions.push("/users"))
         
        }
        localStorage.login = btoa(account.data.firstname)
      }).catch((err) => {
        localStorage.removeItem("login")
        dispatcher(routerActions.push("/login"))
        console.log(err);
      })
  }
}

export let getAccount = (target) => {
  return (dispatcher, getState) => {
    get('/api/account')
      .then((account) => {
        dispatcher(accountReceived(account.data));
      }).catch((err) => {
        console.log(err);
      })
  }
}

export let loginFailed = () => {
    return {
        type: types.AUTH_LOGIN_FAILED,
    }
}


export let accountReceived = (account) => {
  return {
    type: types.AUTH_ACCOUNT_RECEIVE,
    account,
  }
}

export let logout = () => {
  return (dispatcher,getState) => {
    post('/api/logout',{},{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then((response) => {
      localStorage.removeItem("login")
      dispatcher(routerActions.push('/login'))
      dispatcher(logoutSuccess(response));
    }).catch((err) => {
      console.log(err);
    })
  }
}

export let logoutSuccess = () => {
  return {
    type: types.AUTH_LOGOUT_SUCCESS
  }
}
