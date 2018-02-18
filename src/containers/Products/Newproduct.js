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
import * as products from '../../actions/newproductactions';
import Addnewproduct from './Addnewproduct';
import * as addproductActions from '../../actions/addnewproductactions'
import _ from 'lodash'
import * as categoryActions from '../../actions/categoryactions';

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



  componentWillMount()
    {
      this.props.productaction.getProducts();
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
    // const actions = [
    //   <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}}>Save</button>,
    //   <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose} style={{marginRight:10}}>Close</button>,
    // ];
    //
    // const CategoryActions = [
    //   <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}}>Save</button>,
    //   <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleCloseCategory} style={{marginRight:10}}>Close</button>,
    // ];

    return (
      <div>
      <Navlayout open={this.handleOpen}/>
        <Addnewproduct/>
        <Grid>
        <Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
          <h1>Inventory</h1>
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
      this.props.newproduct.data.map ((product,i) =>{
        return (
            <tr>
              <td>{product.id}</td>
              <td>{product.stockName}</td>
              <td>{product.categoryName}</td>
              <td>{product.unit}</td>
              <td>{product.status ? 'active' : 'inactive'}</td>
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
    newproduct:state.newproduct

  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    productaction: bindActionCreators(products,dispatch),
    addproductActions: bindActionCreators(addproductActions,dispatch),
    categoryActions: bindActionCreators(categoryActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Manageproduct);
