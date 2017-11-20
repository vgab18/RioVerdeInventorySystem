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
import NotFound from '../components/404NotFound';
import  {requireAuthentication} from '../utils/AuthUtils'

let route = (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/navbar" component={Navlayout}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/manageproduct" component={Manageproduct}/>
        <Route exact path="/producthistory" component={Producthistory}/>
        <Route exact path="/supplierlist" component={Supplierlist}/>
        <Route exact path="/transactionhistory" component={Transactionhistory}/>

        <Route component={NotFound}/>
    </Switch>
);

export default route;
