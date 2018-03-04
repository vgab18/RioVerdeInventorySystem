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
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
import validatorjs from 'validatorjs';
import  classnames from 'classnames';

class LoginForm extends Component{
  constructor(props){
    super(props);
      this.state={
        userName:'',
        password:''
      }

    this.validatorTypes=strategy.createSchema(
    {
      userName:'required',
      password: 'required'
    },
    {
      "required": "*This field is required*"
    },
    {
      function (validator){
        validator.setAttributesNames({
          userName: 'Username',
          password: 'Password'
        });
      }
    }
  )


  }

    getValidatorData = () => {
      return this.state
    };

    getClasses = (field) => {
      return classnames({
        'success': this.props.isValid(field),
        'error': this.props.isValid(field)
      });

    }

  onFormSubmit = (event) => {
    event.preventDefault();

      this.props.validate(this.onValidate);
  };

  getErrorField = (field) => {
    var error = this.props.errors[field];
    if(!error)
      return null;
    if(Array.isArray(error)){
      var message = [];
      message = error.map((item,i) =>{
        return (
          <span key={i}>
            {item}
            <br />
          </span>
        )
      });
      return message;
    }
    else
      return (<span>{error || ''}</span>);
  };

  onValidate = (error) => {
    if(error){

    }
    else{
      var target = this.props.location.query.target;
      this.props.authActions.login(this.state,target)
      this.setState({
        userName: '',
        password: ''
      })
    }
  };

  handlechange =(e)=>{
    let state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }



  render(){


    return(
      <form>
            <TextField
                floatingLabelText="Username"
                inputStyle={{color:'#0F3057',fontSize:20}}
                errorText={this.props.getValidationMessages("userName").length === 0 ? null : this.props.getValidationMessages("userName")}
                onBlur={()=>this.props.validate('userName')}
                name="userName"
                value={this.state.userName}
                onChange={this.handlechange}
                fullWidth={true}
              />
            <TextField
                floatingLabelText="Password"
                inputStyle={{color:'#0F3057',fontSize:20}}
                type="password"
                errorText={this.props.getValidationMessages("password").length === 0 ? null : this.props.getValidationMessages("password")}
                name="password"
                onBlur={()=>this.props.validate('password')}
                value={this.state.password}
                onChange={this.handlechange}
                fullWidth={true}
              />
          <div className="button">
              <ButtonGroup block>
                  <Button  bsStyle="primary" type="submit" style={{marginTop:'40px',marginBottom:'80px'}}
                  onClick={this.onFormSubmit} onKeyUp={this.onFormSubmit}>Login</Button>
              </ButtonGroup>
          </div>
      </form>
    )
  }


}

export default validation(strategy)(LoginForm);
