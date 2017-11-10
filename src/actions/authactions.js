import * as types from '../constants/AuthActionTypes';
import {post,get} from '../utils/RestClient';
import { routerActions } from 'react-router-redux'
//import {getDefaultRoutesFromRoles} from '~/src/components/shared/RouteRules'
import * as  healthchecks from './healthchecks';
import * as dialogactions from './dialogactions'




export let accountReceived = (account,fromRefresh)=>{


    return {
        type: types.AUTH_ACCOUNTRECIEVE,
        account:account,
        fromRefresh:fromRefresh
    }
};

export let loginSuccess= (targetPath,fromRefresh)=>{


    return dispatch => {


        get('/api/account').then((response)=>{
            // refresh CSRF
            dispatch(healthchecks.ping());

            let account = response.data;

            dispatch(accountReceived(account,fromRefresh));

            if(!account.active){
                dispatch(routerActions.push("/user/forchangepassword"));
            }
            else {
                dispatch(routerActions.push(targetPath));
            }

            localStorage.setItem("login",btoa(response.data.login));



        }).catch((error)=>{

            if (error.response) {
                localStorage.removeItem("login");
                // refresh CSRF
                dispatch(healthchecks.ping());
                if(targetPath)
                    dispatch(routerActions.push("/login?targetPath="+targetPath)); // go back to login
                else{
                    dispatch(routerActions.push("/login"));
                }
            }


        });

    };

};



export let loginFailed = ()=>{

    return {
        type: types.AUTH_LOGIN_FAILED
    }
};

export let login= (loginstate,targetPath)=>{



    return dispatch => {



        post('/api/authentication',{},{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params:loginstate
        }).then((response)=>{
            dispatch(loginSuccess(targetPath));
        }).catch((error)=>{
            dispatch(loginFailed());
            dispatch(healthchecks.ping());
        });

    }
};

export let logoutSuccess= (targetPath)=>{

    return {
        type: types.AUTH_LOGOUT_SUCCESS,
        targetPath
    }

};



export let logout= (targetPath)=>{

    return dispatch => {
        post('/api/logout',{},{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response)=>{
            localStorage.removeItem("login");
            dispatch(routerActions.push("/login"  + (targetPath ? "?targetPath="+targetPath:"")));
            dispatch(logoutSuccess(targetPath));
            dispatch(healthchecks.ping());
        }).catch((error)=>{
            localStorage.removeItem("login");
            dispatch(logoutSuccess(targetPath));
            dispatch(routerActions.push("/login"  + (targetPath ? "?targetPath="+targetPath:"")));
            dispatch(healthchecks.ping());
        });

    }
};



export let updateUserStart= ()=>{

    return {
        type: types.AUTH_UPDATEUSERSTART
    }

};

export let updateUserSuccess= ()=>{

    return {
        type: types.AUTH_UPDATEUSERFINISHED
    }

};




export let updateUser= (user)=>{
    return dispatch => {
        dispatch(updateUserStart());


        post('/api/account',user).then((response)=>{
            dispatch(updateUserSuccess(response.data));
            //dispatch(dialogactions.addNotification('Success','Record Save Successfully','success','bl'));
            dispatch(dialogactions.openAlert("Record save successfully",'Success','success'));
        }).catch((error)=>{
            dispatch(dialogactions.openAlert("Failed to update record",'Failure'));
            dispatch(updateUserSuccess());
        });

    }
};
