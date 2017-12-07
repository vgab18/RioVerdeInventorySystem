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
import DatePicker from 'material-ui/DatePicker';

class Manageproduct extends Component {
  constructor(props){
    super(props);
    this.state ={
      open:false,
      openCategory:false,
    }
  }
    //
    // componentWillMount(){
    //   if(this.props.addproduct.id){
    //
    //   }
    // }


   handleClose = () => {
     this.props.addproductActions.closeAddproduct();
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
     this.props.addproductActions.handleChangenewProduct(name,value)
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
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}} onClick={this.addnewProduct}>Save</button>,
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
          title="+Add New Stock"
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
          <select multiple="" class="form-control" id="exampleSelect2" style={{width:'65%'}} onChange={this.handleChangeCategoryField}>
          {categories}
          </select>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Stock Name</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="stockName" onChange={this.handleChangenewProductField}/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Unit</label>
          <select multiple="" class="form-control" id="exampleSelect2" style={{width:'50%'}} onChange={this.handleChangeUnitField} name="unit">
            <option value="Kg">Kg</option>
            <option value="Litre">Litre</option>
          </select>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Timeframe</label>
          <DatePicker hintText="Choose date" mode="landscape" />
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

export default connect(mapStateToProps,mapDispatchToProps)(Manageproduct);
