import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import {
    Grid, Row, Col,
    Well
} from 'react-bootstrap';
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions  from '../actions/authactions';
 


class AccessDenied extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.authActions.getAccount()
    }


    goBack = () => {
        switch (this.props.auth.account.role) {
            case "admin":
              return  this.props.routerActions.push("/users")
            case "Staff":
              return  this.props.routerActions.push("/inventory")
            case "kitchen":
              return  this.props.routerActions.push("/kitchenrequest")
          
          }
    }


    render(){

        return (
            <Grid id="access-denied">
                  <Well style={{backgroundColor:'#89c0c7'}}>
                    <h1>Access Denied</h1>
                    <button type="button" class="btn btn-primary" onClick={this.goBack}>Go Back</button>
                </Well>
            </Grid>);
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}


function mapDispatchToProps(dispatch) {
    return {
        authActions:bindActionCreators(authActions, dispatch),
        routerActions:bindActionCreators(routerActions, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccessDenied);
