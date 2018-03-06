import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Grid,Col,Row,
        HelpBlock,Image,
        Button,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Paper from 'material-ui/Paper';
import logo from '../Style/images/logo.jpg';
import TextField from 'material-ui/TextField';
import LoginForm from './LoginForm';
import * as authActions from '../actions/authactions';



class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }


  render() {

    return (
      <div>
      <center>
      <div>
      <Grid style={{marginTop:'80px'}}>
          <Row style={{align:'center'}}>
          <Col md={12}>
          <Col md={4}/>
            <Col md={4} style={{padding:15,textAlign:'center'}}>
             <legend style={{marginTop:'10px'}}><img src={logo} width="250"/></legend>
             <legend style={{marginTop:'10px'}}>Inventory System</legend>
             {
               this.props.auth.isWrongCredentials ? <h4> Wrong Credentials </h4> : ''
             }
             
              <LoginForm {...this.props} />
             </Col>
             <Col md={4}/>
             </Col>
             </Row>
             </Grid>
            </div>
          </center>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return{
    router: state.router,
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    authActions: bindActionCreators(authActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
