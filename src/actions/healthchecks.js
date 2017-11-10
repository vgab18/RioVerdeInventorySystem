import * as types from '../constants/HealthCheckTypes';
import {get} from '../utils/RestClient';


export let pingSuccess= ()=> {
    return { type: types.HC_PINGSUCCESS }
}

export let pingError=()=> {
    return { type: types.HC_PINGERROR }
}

export let getFrontendVersion=()=> {
    return { type: types.HC_GETFRONTENDVER }
}




export let ping=()=>{

    return dispatch=>{

        get('/api/public/ping').then((response)=>{
            if(response.data.success)
            dispatch(pingSuccess());
            else
            dispatch(pingError());
        }).catch(function (error) {
            dispatch(pingError());
        });

    }
};
