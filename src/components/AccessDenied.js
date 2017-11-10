import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import {
    Grid, Row, Col,
    Well
} from 'react-bootstrap';
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authactions  from '../actions/authactions';

import ADLogo from '../styles/img/accessDenied.png';


class   AccessDenied extends React.Component{

    constructor(props){
        super(props);
    }





    render(){

        return (
            <Grid id="access-denied">
                  <Well style={{backgroundColor:'#89c0c7'}}>
                    <h1>Access Denied</h1>
                </Well>
            </Grid>);
    }
}


function mapStateToProps(state) {
    return {

    }
}


function mapDispatchToProps(dispatch) {
    return {
        authactions:bindActionCreators(authactions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccessDenied);
