import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Grid,Col,
        HelpBlock,
        Button,nav,
        ButtonGroup,Row} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from '../Navlayout';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import * as productActions from '../../actions/newproductactions';
import Addnewproduct from './Addnewproduct';
import * as addproductActions from '../../actions/addnewproductactions'
import _ from 'lodash'
import * as categoryActions from '../../actions/categoryactions';
import * as addcategoryActions from '../../actions/addcategory';
import AddnewcategoryForm from './AddnewcategoryForm';
import TextField from 'material-ui/TextField';
import icon from '../../Style/images/icon.png';
import { EAFNOSUPPORT } from 'constants';

class Manageproduct extends Component {
  constructor(props){
    super(props);
    this.state ={
      open:false,
      openCategory:false,
    }
  }
  handleOpen = () => {
   this.setState({open: true});
 };

   handleClose = () => {
     this.setState({open: false});
   };

  handleCloseCategory = () => {
    this.setState({openCategory: !this.state.openCategory});
  }

  openmodal = (id) =>{
    this.props.addproductActions.getProductData(id)
    this.props.categoryActions.getCategory()
  };

  openproductmodal = () => {
    this.props.addproductActions.openAddproduct();

  }
  handleChangeCategoryField = (e) => {
    var name = "categoryId"
    var value = parseInt(e.target.value);
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
      this.props.addcategoryActions.closeAddcategory();

    }
  }

  handleAddnewCatergoryField = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.props.addcategoryActions.handleChangeCategory(name,value)
  }

  closecategorymodal = () => {
    this.props.addcategoryActions.closeAddcategory()

  }

  handleChangeSearch = (e) => {
    var value = e.target.value
    var name = e.target.name
    this.props.productActions.handleSearchChange(value,name)
  }




  componentWillMount()
    {
      this.props.productActions.getProducts();
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

    return (
      <div>
      <Navlayout open={this.handleOpen}/>
        <Addnewproduct
        {...this.props}
        />
        <AddnewcategoryForm
        {...this.props}
        addCategory={this.addCategory}
        />

        {/* <AddnewcategoryForm
          {...this.props}
        /> */}

        <Grid>
        <Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
        <Row>
        <Col md={6}>
          <h1>Products</h1>
        </Col>
          <Col md={6}>
            <button type="button" class="btn btn-primary" style={{float:'right'}} onClick={this.openproductmodal}>+Add Product</button>
          </Col>
        </Row>
        <Col md={6}>
            <TextField
           hintText="Search stock"
           fullWidth={true}
           onChange={this.handleChangeSearch}
           type="text"
           value={this.props.newproduct.searchProduct}
           name="searchProduct"
         />
        </Col>
        <br />
          <table class="table table-striped table-hover table-bordered responsive">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Stock Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

  {
      this.props.newproduct.productdata.map ((product,i) =>{
        return (
            <tr>
              <td>{product.id}</td>
              <td>{product.stockName}</td>
              <td>{product.category.categoryName}</td>
              <td>{product.unit}</td>
              <td>{product.status ? 'Active' : 'Inactive'}</td>
              <td><button type="button" class="btn btn-warning" onClick={()=>this.openmodal(product.id)}>Edit</button></td>
            </tr>
          )
        })
  }
          </tbody>
        </table>
        </Paper>
        </Grid>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return{
    router: state.router,
    auth: state.auth,
    product:state.product,
    newproduct:state.newproduct,
    addproduct:state.addproduct,
    addcategory:state.addcategory,
    category:state.category
  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    productActions: bindActionCreators(productActions,dispatch),
    addproductActions: bindActionCreators(addproductActions,dispatch),
    categoryActions: bindActionCreators(categoryActions,dispatch),
    addcategoryActions: bindActionCreators(addcategoryActions,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Manageproduct);
