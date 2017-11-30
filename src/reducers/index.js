import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import healthchecks from './healthchecks';
import authreducers from './authreducers';
import dialogreducers from './dialogreducers';
import httpstatusReducers from './httpstatusReducers';
import userreducers from './userreducers';
import adduserreducers from './adduserreducers';
import addproductreducers from './addnewproductreducers';
import addcategoryreducers from './addcategoryreducers';
import categoryreducers from './categoryreducers';
import newproductreducers from './newproductreducers';

const rootReducer = combineReducers({
    router:routerReducer,
    healthchecks,
    auth:authreducers,
    dialogs:dialogreducers,
    httpstatus:httpstatusReducers,
    user:userreducers,
    adduser:adduserreducers,
    addproduct:addproductreducers,
    addcategory:addcategoryreducers,
    category:categoryreducers,
    newproduct:newproductreducers
});

export default rootReducer;
