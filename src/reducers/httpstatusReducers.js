import * as types from '../constants/HttpStatusActionTypes'
import update from 'react-addons-update';

const initialState = {
  isLoading:false
};



export default function httpstatusReducers(state = initialState, action={}) {


    switch (action.type) {

        case types.HTTPSTATUS_LOADING:
            return update(state,{
                isLoading:{
                    $set:true
                }
            });

        case types.HTTPSTATUS_IDLE:
            return update(state,{
                isLoading:{
                    $set:false
                }
            });
        default:
            return state;
    }
}
