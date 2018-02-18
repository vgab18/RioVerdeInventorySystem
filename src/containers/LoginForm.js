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

class LoginForm extends Component{
  constructor(props){
    super(props);


    this.validatorTypes=strategy.createSchema()
    {
      userName:'required',
      password: 'required'
    },
    {
      "required": "This field :attribute is required!"
    },
    {
      function (validator){
        validator.setAttributesNames({
          userName: 'Username',
          password: 'Password'
        });
      }
    }

  }

    getValidatorData = () => {
      return this.props.addUser
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
    var error   = this.props.errors[fields];
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
      event.preventDeafult();
    }
    else{
      this.saveRecord()
    }
  };


  render(){
    return{
      <form>
          <FormGroup>
                  <TextField
                      floatingLabelText="Username"
                      style={{width:'310px'}}
                      inputStyle={{color:'#0F3057',fontSize:20}}
                    />
              <HelpBlock> </HelpBlock>
          </FormGroup>
          <FormGroup>
            <TextField
                floatingLabelText="Password"
                style={{width:'310px'}}
                inputStyle={{color:'#0F3057',fontSize:20}}
                type="password"
              />
              <HelpBlock> </HelpBlock>
          </FormGroup>
          <div className="button">
              <ButtonGroup>
                  <Button  bsStyle="primary" type="submit" style={{width:'250px',marginTop:'40px',marginBottom:'80px'}}
                  onClick={()=>this.props.routerActions.push("/users")}>Login</Button>
              </ButtonGroup>
          </div>
      </form>
    }
  }


}

export default validation(strategy)(LoginForm);
