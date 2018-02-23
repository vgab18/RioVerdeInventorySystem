import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
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
        <Route exact path="/manageproduct" component={Manageproduct}/>
        <Route exact path="/producthistory" component={Producthistory}/>
        <Route exact path="/supplierlist" component={Supplierlist}/>
        <Route exact path="/transactionhistory" component={Transactionhistory}/>
        <Route exact path="/kitchenrequest" component={Kitchen}/>
        <Route exact path="/inventory" component={Inventory}/>
        <Route exact path="/staffsupplierlist" component={Staffsupplierlist}/>


        <Route component={NotFound}/>
    </Switch>
);

export default route;
