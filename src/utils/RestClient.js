import axios from 'axios'
import _ from 'lodash'
import Promise from 'bluebird'
import * as httpstatusActions from '../actions/httpstatusActions'
import * as authActions from '../actions/authactions'
import * as dialogActions from '../actions/dialogactions'

// see https://github.com/mzabriskie/axios



var store = null;


function dispatch(){

    if(store ==null){

        return ()=>{

        };
    }

    return store.dispatch;
}



export let registerStore=(storeParam)=>{

    store = storeParam;
};

const defaultConfig = {
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    xsrfCookieName: 'CSRF-TOKEN',
    xsrfHeaderName: 'X-Csrf-Token'
};

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent

   if((config.method === 'post' || config.method === 'POST' || config.method === 'get' || config.method === 'GET') && config.track)
    dispatch()(httpstatusActions.httpStatusLoading());

    return config;
}, function (error) {
    // Do something with request error
    dispatch()(httpstatusActions.httpStatusIdle());
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    if((response.config.method === 'post' || response.config.method === 'POST' || response.config.method === 'get' || response.config.method === 'GET')  && response.config.track)
    dispatch()(httpstatusActions.httpStatusIdle());
    return response;
}, function (error) {
    // Do something with response error

    if(store && store.getState().auth.isAuthenticated){
        if(_.get(error,'response.status',0)===401 || _.get(error,'response.status','')==='401')
        {
            setTimeout(()=>{
                dispatch()(dialogActions.openAlert('Your Session has expired','Session Expiry','warning',()=>{
                    dispatch()(authActions.logout());
                }));
            },1000);
        }
    }

    dispatch()(httpstatusActions.httpStatusIdle());
    return Promise.reject(error);
});


export let get  = (path,config,track=false)=>{

       if(!config)
       config = {};

     config = _.assign({},defaultConfig,config);

     config.track = track;

    return axios.get(path,config);
};

export let post  = (path,body,config,track=true)=>{

    if(!config)
        config = {};


    config = _.assign({},defaultConfig,config);

    config.track = track;

    return axios.post(path,body || {}, config);
};

export let put  = (path,body,config)=>{

    if(!config)
        config = {};

    config = _.assign({},defaultConfig,config);


    return axios.put(path,body || {}, config);
};

export let patch  = (path,body,config,track=true)=>{
    if(!config)
        config = {};

    config = _.assign({},defaultConfig,config);
    config.track = track;

    return axios.patch(path,body || {}, config);
};


export let _delete  = (path,config)=>{

    if(!config)
        config = {};

    config = _.assign({},defaultConfig,config);

    return axios.delete(path,config);

};
