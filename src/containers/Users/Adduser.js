import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Row,
        HelpBlock,
        Button,nav,
        ButtonGroup,Grid,Modal,Col} from 'react-bootstrap';
import {RadioButtonGroup,RadioButton} from 'material-ui';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from '../Navlayout';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import * as adduserActions from '../../actions/adduseractions';
import * as userActions from '../../actions/useractions';
import AddUserForm from './Adduser';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
import validatorjs from 'validatorjs';
import  classnames from 'classnames';



class Adduser extends Component {
  constructor(props){
    super(props);
    this.state ={
      firstName: false,
      lastname: false,
      address: false,
      contactNo: false,
      userName: false,
      password: false,
      confirmpassword: false
    }

    this.validatorTypes=strategy.createSchema(
      {
        firstName: 'required',
        lastName: 'required',
        address: 'required',
        contactNo: 'required',
        gender: 'required',
        userName: 'required',
        password: 'required',
        confirmpassword: 'required|same:password',
        role: 'required'
      },
      {
        "required": "*This field is required*",
        "confirmpassword": "Please confirm your password"
      },
      function (validator){
        validator.setAttributeNames({
          firstName: 'First Name',
          lastName: 'Last Name',
          address: 'Address',
          contactNo: 'Contact Number',
          gender: 'Gender',
          userName: 'Username',
          password: 'Password',
          confirmpassword: 'Confirm Password'
        });
      }
    );
  }


  componentWillMount(){
    this.props.clearValidations()
  }
  handleOpen = () => {
   this.setState({open: true});
 };

 handleClose = () => {
   this.props.adduserActions.closeAdduser();
 };

 handleChange = () => {
   return (e) => {
     var name = e.target.name;
     var value = e.target.value;
     this.props.adduserActions.handleChange(name,value)
   }
 }

 handleselectChange = () => {
   return(e) =>{
     var name = 'role';
     var value = e.target.value;
     this.props.adduserActions.handleChange(name,value)
 }
}

  addUser = () => {
    if (this.props.adduser.edit) {
      this.props.adduserActions.saveUser();
      this.props.users.getUsers();
    }
    else {
      this.props.adduserActions.addUser();
      this.props.users.getUsers();
    }
  }


  getValidatorData = () => {
    return this.props.adduser
  };

  getClasses = (div,field) => {

    if(this.state[field]){
      if (div === "container") {
        return classnames({
          'success': this.props.isValid(field),
          'danger': !this.props.isValid(field)
        });
      }else{
        return classnames({
          'valid': this.props.isValid(field),
          'invalid': !this.props.isValid(field)
        });
      }
    }
  }

onFormSubmit = (event) => {
  event.preventDefault();

    this.props.validate(this.onValidate);
};

getErrorField = (field) => {
  var error   = this.props.errors[field];
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
    this.addUser()
  }
};

render(){

  const actions = [
    <button type="submit" class="btn btn-info" style={{marginRight:10,width:'150px'}}  onClick={this.onFormSubmit}  >Save</button>,
    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose} style={{marginRight:10}}>Close</button>,
  ];
  const modalscroll={
    overflow: 'auto',
    height: '90%'
  }
  return(
    <Dialog
      title={this.props.adduser.edit ? "+Edit User" : "+Add New User" }
      actions={actions}
      modal={false}
      autoScrollBodyContent={true}
      open={this.props.adduser.open}
      onRequestClose={this.handleClose}
      >
      <Grid>
      <Col sm={9}style={{marginLeft:'14%'}}>
      <form>
         <fieldset>
         <FormGroup controlId="formControlsSelect">
           <ControlLabel>Select</ControlLabel>
             <FormControl onChange={this.handleselectChange()} componentClass="select"
            placeholder="select"
            onBlur={()=>{
              this.setState({
                firstName: true
              })
              this.props.validate('event');
            }}>
                  <option value="staff">Staff</option>
                  <option value="kitchen">Kitchen</option>
            </FormControl>
        </FormGroup>
          <div class={"form-group has-"+ this.getClasses("container",'firstName')}>
            <label for="exampleInputEmail1">First Name</label>
            <input name="firstName" 
              onChange={this.handleChange()} 
              onBlur={()=>{
                this.setState({
                  firstName: true
                })
                this.props.validate('firstName');
              }}
              class={"form-control is-"+ this.getClasses("input",'firstName')}
              value={this.props.adduser.firstName} 
              type="text" 
              id="inputValid"
            />
            <div class={this.getClasses("input",'firstName') + "-feedback"} style={this.state.firstName ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('firstName')}
            </div>
          </div>
          <div class={"form-group has-"+ this.getClasses("container",'lastName')}>
          <label for="exampleInputEmail1">Last Name</label>
          <input name="lastName"
            onChange={this.handleChange()}
            value={this.props.adduser.lastName} type="text" class={"form-control is-"+ this.getClasses("input",'lastName')} 
            id="inputValid" 
            onBlur={()=>{
              this.setState({
                lastName: true
              })
              this.props.validate('lastName');
            }}/>
            <div class={this.getClasses("input",'lastName') + "-feedback"} style={this.state.lastName ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('lastName')}
            </div>
          </div>
          <div class={"form-group has-"+ this.getClasses("container",'address')}>
          <label for="exampleInputEmail1">Address</label>
          <input name="address" 
            onChange={this.handleChange()}
            value={this.props.adduser.address} type="text" class={"form-control is-"+ this.getClasses("input",'address')}
            id="inputValid" 
            onBlur={()=>{
              this.setState({
                address: true
              })
              this.props.validate('address');
            }}/>
            <div class={this.getClasses("input",'address') + "-feedback"} style={this.state.address ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('address')}
            </div>
          </div>
          <div class={"form-group has-"+ this.getClasses("container",'contactNo')}>
          <label for="exampleInputEmail1">Contact No.</label>
          <input name="contactNo"
            onChange={this.handleChange()}
            value={this.props.adduser.contactNo} type="number" class={"form-control is-"+ this.getClasses("input",'contactNo')}
            id="inputValid" 
            onBlur={()=>{
              this.setState({
                contactNo: true
              })
              this.props.validate('contactNo');
            }}/>
            <div class={this.getClasses("input",'contactNo') + "-feedback"} style={this.state.contactNo ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('contactNo')}
            </div>
          </div>
          <Row>
          <label for="exampleInputEmail1">
          <Col md={4}>
            Gender
            </Col>
          </label>
          <RadioButtonGroup
              name="gender"
              defaultSelected="Male"
              valueSelected={this.props.adduser.gender}
              onChange={this.handleChange()}>

              <RadioButton
              value="Male"
              label="Male"/>

              <RadioButton
              value="Female"
              label="Female"/>

          </RadioButtonGroup>
            </Row>
          <div class={"form-group has-"+ this.getClasses("container",'userName')}>
          <label for="exampleInputEmail1">Username</label>
          <input name="userName" 
            onChange={this.handleChange()} 
            value={this.props.adduser.userName} type="email" class={"form-control is-"+ this.getClasses("input",'userName')}
            id="inputValid"
            onBlur={()=>{
              this.setState({
                userName: true
              })
              this.props.validate('userName');
            }}/>
            <div class={this.getClasses("input",'userName') + "-feedback"} style={this.state.userName ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('userName')}
            </div>
          </div>
          <div class={"form-group has-"+ this.getClasses("container",'password')}>
          <label for="exampleInputEmail1">Password</label>
          <input name="password"
          onChange={this.handleChange()}
          value={this.props.adduser.password} type="password" class={"form-control is-"+ this.getClasses("input",'password')}
          id="inputValid"
          onBlur={()=>{
            this.setState({
              password: true
            })
            this.props.validate('password');
          }}/>
            <div class={this.getClasses("input",'password') + "-feedback"} style={this.state.password ? {display: "block"} : {display: "none"}}>
              {this.getErrorField('password')}
            </div>
          </div>
          <div class={"form-group has-"+ this.getClasses("container",'confirmpassword')}>
          <label for="exampleInputEmail1">Confirm Password</label>
          <input name="confirmpassword"
            onChange={this.handleChange()}
            value={this.props.adduser.confirmpassword} type="password" class={"form-control is-"+ this.getClasses("input",'confirmpassword')}
             id="inputValid" 
             onBlur={()=>{
              this.setState({
                confirmpassword: true
              })
              this.props.validate('confirmpassword');
            }}/>
              <div class={this.getClasses("input",'confirmpassword') + "-feedback"} style={this.state.confirmpassword ? {display: "block"} : {display: "none"}}>
              {this.getErrorField('confirmpassword')}
            </div>
          </div>
        </fieldset>
      </form>
        </Col>
        </Grid>
    </Dialog>
    )
  }

}

export default validation(strategy)(Adduser);