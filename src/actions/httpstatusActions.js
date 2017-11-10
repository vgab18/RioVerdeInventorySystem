import * as types from '../constants/HttpStatusActionTypes'


export let httpStatusLoadingSuccess = ()=>{

    return {
        type: types.HTTPSTATUS_LOADING
    }
};


export let httpStatusLoading=()=>{

    return (dispatch,getState)=>{

        var {httpstatus} = getState();
        if(!httpstatus.isLoading)
            dispatch(httpStatusLoadingSuccess());

    };

};



export let httpStatusIdleSuccess = ()=>{
    return {
        type: types.HTTPSTATUS_IDLE
    }
};

export let httpStatusIdle=()=>{

    return (dispatch,getState)=>{

        var {httpstatus} = getState();
        if(httpstatus.isLoading)
            dispatch(httpStatusIdleSuccess());

    };
};
