import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Col,Grid,Row,
        HelpBlock,
        Button,nav,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from './Navlayout';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
import validatorjs from 'validatorjs';
import  classnames from 'classnames';
import * as addsupplierActions from '../actions/addnewsupplieractions';

class SupplierlistForm extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName:false,
            lastName:false,
            company:false,
            address:false,
            contactNo: false
        }

        this.validatorTypes=strategy.createSchema(
            {
              firstName: 'required',
              lastName: 'required',
              company: 'required',
              address: 'required',
              contactNo: 'required',
            },
            {
              "required": "*This field is required*",
            },
            function (validator){
              validator.setAttributeNames({
                firstName: 'First Name',
                lastName: 'Last Name',
                company: 'Company Name',
                address: 'Address',
                contactNo: 'Contact No'
              });
            }
          )
    }

    componentWillMount(){
        this.props.clearValidations()
      }
    
      getValidatorData = () => {
        return this.props.addsupplier
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
          this.props.addnewProduct()
        }
      };

    handleCloseSupplierModal = () => {
        this.props.addsupplierActions.CloseAddSupplierModal();
    }

    handleCloseSupplierModal = () => {
    this.props.addsupplierActions.CloseAddSupplierModal();
    }

    addSupplier = () => {
        if (this.props.addsupplier.edit) {
          this.props.addsupplierActions.saveSupplier();
        //   this.props.addsupplierActions.getSuppliers();
        }
        else {
          this.props.addsupplierActions.addSupplier();
          this.props.addsupplierActions.getSuppliers();
        }
    }

    handleChange = () => {
        return (e) => {
          var name = e.target.name;
          var value = e.target.value;
    
          this.props.addsupplierActions.handleChange(name,value)
        }
      }
     


render(){
    const actions = [
        <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}}  onClick={this.addSupplier}>Save</button>,
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleCloseSupplierModal} style={{marginRight:10}}>Close</button>,
        ];

     return(
        <Dialog
          title={this.props.addsupplier.edit ? "+Edit Supplier" : "+Add New Supplier"}
          actions={actions}
          modal={false}
          open={this.props.addsupplier.open}
          autoScrollBodyContent={true}
          onRequestClose={this.props.handleCloseSupplierModal }
        >
        <Col sm={9}style={{marginLeft:'14%'}}>
        <div class={"form-group has-"+ this.getClasses("container",'firstName')}>
            <label for="exampleInputEmail1">First Name</label>
            <input name="firstName"
                onChange={this.handleChange()}
                value={this.props.addsupplier.firstName}
                type="text"
                class={"form-control is-"+ this.getClasses("input",'firstName')}
                id="inputValid"
                onBlur={()=>{
                    this.setState({
                    firstName: true
                    })
                    this.props.validate('firstName');
                }}/>
        </div>
        <div class={this.getClasses("input",'firstName') + "-feedback"} style={this.state.firstName ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('firstName')}
        </div>
        <div class={"form-group has-"+ this.getClasses("container",'lastName')}>
            <label for="exampleInputEmail1">Last Name</label>
            <input name="lastName"
                onChange={this.handleChange()}
                value={this.props.addsupplier.lastName}
                type="text"
                class={"form-control is-"+ this.getClasses("input",'lastName')}
                id="inputValid"
                onBlur={()=>{
                    this.setState({
                    lastName: true
                    })
                    this.props.validate('lastName');
                }}/>
        </div>
        <div class={this.getClasses("input",'lastName') + "-feedback"} style={this.state.lastName ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('lastName')}
        </div>
        <div class={"form-group has-"+ this.getClasses("container",'company')}>
            <label for="exampleInputEmail1">Company</label>
            <input
                name="company"
                onChange={this.handleChange()}
                value={this.props.addsupplier.company}
                type="text"
                class={"form-control is-"+ this.getClasses("input",'company')}
                id="inputValid"
                onBlur={()=>{
                    this.setState({
                        company: true
                    })
                    this.props.validate('company');
                }}/>
        </div>
        <div class={this.getClasses("input",'company') + "-feedback"} style={this.state.company ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('company')}
        </div>
        <div class={"form-group has-"+ this.getClasses("container",'address')}>
            <label for="exampleInputEmail1">Address</label>
            <input
                name="address"
                onChange={this.handleChange()}
                value={this.props.addsupplier.address}
                type="text"
                class={"form-control is-"+ this.getClasses("input",'address')}
                id="inputValid"
                onBlur={()=>{
                    this.setState({
                        address: true
                    })
                    this.props.validate('address');
                }}/>
        </div>
        <div class={this.getClasses("input",'address') + "-feedback"} style={this.state.address ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('address')}
        </div>
        <div class={"form-group has-"+ this.getClasses("container",'contactNo')}>
            <label for="exampleInputEmail1">Contact Number</label>
            <input
                name="contactNo"
                onChange={this.handleChange()}
                value={this.props.addsupplier.contactNo}
                type="number"
                class={"form-control is-"+ this.getClasses("input",'contactNo')}
                id="inputValid"
                onBlur={()=>{
                    this.setState({
                        contactNo: true
                    })
                    this.props.validate('contactNo');
                }}/>
        </div>
        <div class={this.getClasses("input",'contactNo') + "-feedback"} style={this.state.contactNo ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('contactNo')}
        </div>

        </Col>
        </Dialog>            

        );
    }


}

export default validation(strategy)(SupplierlistForm);