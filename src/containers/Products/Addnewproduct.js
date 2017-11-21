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

    handleOpen = () => {
     this.setState({open: true});
   };

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
       var name = e.target.name;
       var value = e.target.value;
       this.props.addcategoryActions.handleChangeCategory(name,value)
   }

   handleChangenewProductField =  (e) => {
     var name = e.target.name;
     var value = e.target.value;
     this.props.addproductActions.handleChangenewProduct(name,value)
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
     }
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
      <option>{category.categoryName}</option>
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
        <button type="button" class="btn btn-warning" style={{marginTop:'32px',marginLeft:'260px',position:'absolute',width:'163px'}} onClick={this.opencategorymodal}>Add New</button>
          <select multiple="" class="form-control" id="exampleSelect2" style={{width:'65%'}}>
          {categories}
          </select>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Stock Name</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="stockName" onChange={this.handleChangenewProductField}/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Unit</label>
          <select multiple="" class="form-control" id="exampleSelect2" style={{width:'50%'}}>
            <option name="unit">Kg</option>
            <option value="unit">Litre</option>
          </select>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Timeframe</label>
          <div class="input-group">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div class="input-group-addon">Days</div>
          </div>
        </div>
        </Col>
        </Grid>
        </div>
        </Dialog>
        <Dialog
          title="+Add New Category"
          actions={CategoryActions}
          modal={false}
          open={this.props.addcategory.open}
          onRequestClose={this.closecategorymodal}
        >
        <Col sm={9}style={{marginLeft:'14%'}}>
        <div class="form-group">
        <label for="exampleInputEmail1">Stock Name</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="categoryName" onChange={this.handleChangeCategoryField}/>
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