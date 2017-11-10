import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import healthchecks from './healthchecks';
import authreducers from './authreducers';
import dialogreducers from './dialogreducers';
import httpstatusReducers from './httpstatusReducers';


const rootReducer = combineReducers({
    router:routerReducer,
    healthchecks,
    auth:authreducers,
    dialogs:dialogreducers,
    httpstatus:httpstatusReducers
});

export default rootReducer;
