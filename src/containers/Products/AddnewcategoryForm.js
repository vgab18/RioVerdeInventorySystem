import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Grid,Col,
        HelpBlock,
        Button,nav,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import * as addcategoryActions from '../../actions/addcategory';
import * as categoryActions from '../../actions/categoryactions';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
import validatorjs from 'validatorjs';
import  classnames from 'classnames';


class AddnewcategoryForm extends Component {
    constructor(props){
        super(props);
        this.state={
            categoryName: false,
        }

        this.validatorTypes=strategy.createSchema(
            {
              categoryName: 'required',
            },
            {
              "required": "*This field is required*",
            },
            function (validator){
              validator.setAttributeNames({
                stockName: 'Stock Name',
              });
            }
          )
    }

    componentWillMount(){
        this.props.clearValidations()
      }

      getValidatorData = () => {
        return this.props.addcategory
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
          this.props.addCategory()
        }
      };


      handleAddnewCatergoryField = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        this.props.addcategoryActions.handleChangeCategory(name,value)
      }

      closecategorymodal = () => {
        this.props.addcategoryActions.closeAddcategory()
        this.setState=({
          categoryName:false
        })
      }
      

render(){

    const CategoryActions = [
        <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}} onClick={this.onFormSubmit}>Save</button>,
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.closecategorymodal} style={{marginRight:10}}>Close</button>,
      ];

    return(

        <Dialog
          title={this.props.addcategory.edit ? "+Edit Category" : "+Add New Category"}
          actions={CategoryActions}
          modal={false}
          open={this.props.addcategory.open}
          onRequestClose={this.closecategorymodal}
        >
        <Col sm={9}style={{marginLeft:'14%'}}>
        <div class={"form-group has-"+ this.getClasses("container",'categoryName')}>
        <label for="exampleInputEmail1">Category Name</label>
        <input type="text"
            class={"form-control is-"+ this.getClasses("input",'categoryName')}
            id="inputValid"
            name="categoryName"
            onChange={this.handleAddnewCatergoryField}
            value={this.props.addcategory.categoryName}
            onBlur={()=>{
                this.setState({categoryName: true})
                this.props.validate('categoryName');
              }}/>
            <div class={this.getClasses("input",'categoryName') + "-feedback"} style={this.state.categoryName ? {display: "block"} : {display: "none"}}>
                {this.getErrorField('categoryName')}
            </div>
        </div>
        </Col>
        </Dialog>

    );
}
}

export default validation(strategy)(AddnewcategoryForm);
