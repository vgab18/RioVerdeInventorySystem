import  * as actions from '../constants/AuthActionTypes';
import  update from 'react-addons-update';



export default function authreducers(state={
    isAuthenticated: false,
    hideAdminNav:false,
    isWrongCredentials: false,
    account:null,
    logoutSuccess:false,
    fromStart:false,
    disableSaveEditUser: false
}, action={}) {

    switch (action.type) {

        case actions.AUTH_SHOWADMINNAV:
            return   update(state,{
                hideAdminNav:{
                    $set:false
                }
            });

        case actions.AUTH_HIDEADMINNAV:
            return   update(state,{
                hideAdminNav:{
                    $set:true
                }
            });

        case actions.AUTH_ACCOUNTRECIEVE:
            return update(state,{
                isAuthenticated:{
                    $set:true
                },
                isWrongCredentials: {
                    $set:false
                },
                logoutSuccess: {
                    $set:false
                },
                account:{
                    $set:action.account
                },
                fromStart: {
                    $set:(action.fromRefresh) ?  false  :true
                }
            });

        case actions.AUTH_LOGOUT_FAILED:
            return update(state,{
                isAuthenticated: {
                    $set:false
                },
                isWrongCredentials: {
                    $set:true
                },
                logoutSuccess:{
                    $set:false
                },
                account:{
                    $set:null
                }
            });
        case actions.AUTH_LOGOUT_SUCCESS:
            return update(state,{
                logoutSuccess:{
                    $set: !action.targetPath
                },
                isAuthenticated: {
                    $set:false
                },
                isWrongCredentials: {
                    $set:false
                },
                account:{
                    $set:null
                }
            });

        case actions.AUTH_UPDATEUSERSTART:
            return update(state,{
                disableSaveEditUser:{
                    $set:true
                }
            });

        case actions.AUTH_UPDATEUSERFINISHED:
            return update(state,{
                disableSaveEditUser:{
                    $set:false
                }
            });

        default:
            return state;
    }


}
