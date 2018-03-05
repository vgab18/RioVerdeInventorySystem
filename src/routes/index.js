import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';
import {Redirect} from 'react-router';
import Login from '../containers/Login';
import Navlayout from '../containers/Navlayout';
import Users from '../containers/Users/Users';
import Manageproduct from '../containers/Products/Newproduct';
import Producthistory from '../containers/Producthistory';
import Transactionhistory from '../containers/Transactionhistory';
import Supplierlist from '../containers/Supplierlist';
import Kitchen from '../containers/Kitchen/kitchenRequest';
import Inventory from '../containers/Staff/Inventory';
import NotFound from '../components/404NotFound';
import  {requireAuthentication} from '../utils/AuthUtils';
import Staffsupplierlist from '../containers/Staff/Staffsupplierlist';

let route = (
    <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/navbar" component={Navlayout}/>
        <Route exact path="/users" component={requireAuthentication("admin",Users)}/>
        <Route exact path="/manageproduct" component={requireAuthentication("admin",Manageproduct)}/>
        <Route exact path="/producthistory" component={requireAuthentication("admin",Producthistory)}/>
        <Route exact path="/supplierlist" component={requireAuthentication("admin",Supplierlist)}/>
        <Route exact path="/transactionhistory" component={requireAuthentication("admin",Transactionhistory)}/>
        <Route exact path="/kitchenrequest" component={requireAuthentication("kitchen",Kitchen)}/>
        <Route exact path="/inventory" component={requireAuthentication("staff",Inventory)}/>
        <Route exact path="/staffsupplierlist" component={requireAuthentication("staff",Staffsupplierlist)}/>
        <Route exact path="/accessdenied" component={NotFound}/>
        <Redirect to="/users" />
    </Switch>
);

export default route;
