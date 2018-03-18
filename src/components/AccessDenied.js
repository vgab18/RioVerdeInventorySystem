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
import {Paper} from 'material-ui';
import accessdenied from '../Style/images/forbidden.jpg';



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

      const paperstyle=
      {
        height: 'auto',
        width: 'auto',
        margin:50,
        marginTop:100,
        padding: 20,
        overflowX: 'auto',
        textAlign:'center'
            };

        return (
            <Grid id="access-denied">
                  <Paper style={paperstyle}>
                    <h1 style={{color:'red'}}>Access Denied</h1>
                    <h5><img src={accessdenied}/></h5>
                    <h5>THE ACCESS IS DENIED</h5>
                    <p><h6 style={{color:'gray'}}>Please contact your system administreator for more information</h6></p>
                    <button type="button" class="btn btn-primary" onClick={this.goBack}>Go Back</button>
                </Paper>
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
