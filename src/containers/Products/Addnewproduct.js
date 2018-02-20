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
import Navlayout from '../Navlayout';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import * as addproductActions from '../../actions/addnewproductactions';
import * as productActions from '../../actions/newproductactions';
import * as addcategoryActions from '../../actions/addcategory';
import * as categoryActions from '../../actions/categoryactions';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
import validatorjs from 'validatorjs';
import  classnames from 'classnames';



class Manageproduct extends Component {
  constructor(props){
    super(props);
    this.state ={
      stockName: false
    }

    this.validatorTypes=strategy.createSchema(
      {
        stockName: 'required',
      },
      {
        "required": "*This field is required*",
      },
      function (validator){
        validator.setAttributeNames({
          stockName: 'Stock Name',
        })
      }
    )
  }

  componentWillMount(){
    this.props.clearValidations()
  }

  getValidatorData = () => {
    return this.props.addproduct
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
    this.addproduct()
  }
}
   
  handleChange = () => {
    return (e) => {
      var name = e.target.name;
      var value = e.target.value;
      
      this.props.productaction.handleChange(name,value)
    }
  }

   handleClose = () => {
     this.props.addproductActions.closeEditproduct();
     this.setState=({
       stockName:false
     })
   };

   opencategorymodal = () => {
     this.props.addcategoryActions.openAddcategory()

   }

   closecategorymodal = () => {
     this.props.addcategoryActions.closeAddcategory()

   }

   handleChangeCategoryField = (e) => {
     var name = "categoryId"
     var value = parseInt(e.target.value);
     this.props.addproductActions.handleChangenewProduct(name,value)
   }

   handleAddnewCatergoryField = (e) => {
     var name = e.target.name;
     var value = e.target.value;
     this.props.addcategoryActions.handleChangeCategory(name,value)
   }

   handleChangenewProductField =  (e) => {
     var name = e.target.name; //ccategoryId
     var value = e.target.value; //1
     this.props.addproductActions.handleEditProduct(name,value)
   }

   openEditcategorymodal = () => {
     this.props.addcategoryActions.getCategoryData(this.props.addproduct.categoryId);
   }

   addCategory = () => {
     if (this.props.addcategory.edit) {
       this.props.addcategoryActions.saveCategory();
       this.props.categoryActions.getCategory();
       this.props.addcategoryActions.closeAddcategory();
     }
     else {
       this.props.addcategoryActions.addCategory();
       this.props.categoryActions.getCategory();
       this.props.addcategoryActions.closeAddcategory();

     }
   }


   addnewProduct = () => {
     if (this.props.addproduct.edit) {
       this.props.addproductActions.saveNewProduct();
       this.props.productActions.getProducts();
       this.props.addproductActions.closeAddproduct();

     }
     else {
       this.props.addproductActions.addProduct();
       this.props.productActions.getProducts();
       this.props.addproductActions.closeAddproduct();
     }
   }

   handleChangeUnitField = (e) => {
      var name = "unit";
      var value = e.target.value;
      console.log(e.target.value);
      this.props.addproductActions.handleChangenewProduct(name,value)
   }

  render() {
    const paperstyle=
    {
      height: 'auto',
      width: 'auto',
      margin: 50,
      padding: 20,
      overflowX: 'auto'
    };
    const actions = [
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}} onClick={this.onFormSubmit}>Save</button>,
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose} style={{marginRight:10}}>Close</button>,
    ];

    const CategoryActions = [
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}} onClick={this.addCategory}>Save</button>,
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.closecategorymodal} style={{marginRight:10}}>Close</button>,
    ];
  var categories = (this.props.category.data.map((category,i) => {
    return (
      <option name="categoryId" value={category.id}>{category.categoryName}</option>
    )
  }))
    return (
      <div>
      <Dialog
          title={this.props.addproduct.edit? "+Edit Product" : "+Add New Product"}
          actions={actions}
          modal={false}
          open={this.props.addproduct.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
        <div>
        <Grid>
        <Col sm={9}style={{marginLeft:'14%'}}>
        <div class="form-group">
        <label for="exampleInputEmail1">Category</label>
        <button type="button" class="btn btn-primary" style={{marginTop:'32px',marginLeft:'360px',position:'absolute',width:'133px'}} onClick={this.opencategorymodal}>Add New</button>
        <button type="button" class="btn btn-warning" style={{marginTop:'32px',marginLeft:'260px',position:'absolute',width:'90px'}} onClick={this.openEditcategorymodal}>Edit</button>
          <select value={this.props.addproduct.categoryId} multiple="" class="form-control" id="exampleSelect2" style={{width:'65%'}} onChange={this.handleChangeCategoryField}>
          {categories}
          </select>
        </div>
        <div class={"form-group has-"+ this.getClasses("container",'stockName')}>
        <label for="exampleInputEmail1">Stock Name</label>
        <input type="email"
          class={"form-control is-"+ this.getClasses("input",'firstName')}
          value={this.props.addproduct.stockName}
          onChange={this.handleChange()}
          id="inputValid"
          name="stockName"
          onBlur={()=>{
            this.setState({
              stockName: true
            })
            this.props.validate('stockName');
          }}/>
        </div>
        <div class={this.getClasses("input",'stockName') + "-feedback"} style={this.state.stockName ? {display: "block"} : {display: "none"}}>
            {this.getErrorField('stockName')}
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Unit</label>
          <select multiple="" class="form-control" value={this.props.addproduct.unit} onChange={this.handleChange()} id="exampleSelect2" style={{width:'50%'}} onChange={this.handleChangeUnitField} name="unit">
            <option value="Kg">Kg</option>
            <option value="Litre">Litre</option>
          </select>
        </div>
        </Col>
        </Grid>
        </div>
        </Dialog>
        <Dialog
          title={this.props.addcategory.edit ? "+Edit Category" : "+Add New Category"}
          actions={CategoryActions}
          modal={false}
          open={this.props.addcategory.open}
          onRequestClose={this.closecategorymodal}
        >
        <Col sm={9}style={{marginLeft:'14%'}}>
        <div class="form-group">
        <label for="exampleInputEmail1">Category Name</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="categoryName" onChange={this.handleAddnewCatergoryField} value={this.props.addcategory.categoryName}/>
        </div>
        </Col>
        </Dialog>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return{
    router: state.router,
    auth: state.auth,
    addproduct:state.addproduct,
    addcategory:state.addcategory,
    category:state.category
  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    addproductActions: bindActionCreators(addproductActions,dispatch),
    productActions: bindActionCreators(productActions,dispatch),
    addcategoryActions: bindActionCreators(addcategoryActions,dispatch),
    categoryActions:bindActionCreators(categoryActions,dispatch)
  }
}

export default validation(strategy)(Manageproduct);
