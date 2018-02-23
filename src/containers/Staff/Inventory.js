import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Grid,Col,
        HelpBlock,Row,
        Button,nav,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from '../Navlayout';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import * as products from '../../actions/newproductactions';
import * as addproduct from '../../actions/addnewproductactions'
import _ from 'lodash';
import * as addsupplierActions from '../../actions/addnewsupplieractions';
import * as inventoryActions from '../../actions/inventoryactions';
import * as categoryActions from '../../actions/addcategory';
import Clear from 'material-ui/svg-icons/content/clear';
import { EAFNOSUPPORT } from 'constants';
import FloatingActionButton from 'material-ui/FloatingActionButton';




class Inventory extends Component {
  constructor(props){
    super(props);
    this.state ={
      open:false,
      openSupplier:false,
    }
  }
  handleOpen = () => {
   this.props.inventoryActions.openStockIn();

 };

 handleClose = () => {
   this.props.inventoryActions.closeStockIn();
 };

 addRows = () => {
   this.props.inventoryActions.addRows();
 }

 deleteRows =(index) => {
   this.props.inventoryActions.deleteRows(index);
 }
 
 changeProduct = (e,inventoryIndex) => {
   var name = e.target.name;
   var value = e.target.value
   console.log(inventoryIndex)
   this.props.inventoryActions.changeProduct(value,inventoryIndex);
 }




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

    const dialogstyle = {
      width:'70%',
      maxWidth:'none'
    }
    const Actions = [
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}}>Save</button>,
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose} style={{marginRight:10}}>Close</button>,
    ];

    const SupplierActions = [
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}}>Save</button>,
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose} style={{marginRight:10}}>Close</button>,
    ];

    return (
      <div>
      <Navlayout open={this.handleOpen}/>
        <Grid>
        <Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
        <Row>
        <Col md={3}>
          <h1>Inventory</h1>
        </Col>
        <Col md={3} style={{paddingRight:'3px'}}>
          <button type="button" class="btn btn-outline-primary" style={{float:'right',width:'200px'}} onClick={this.handleOpen}>( + )
          Stock In</button>
        </Col>
        <Col md={6} style={{paddingLeft:'3px'}}>
          <button type="button" class="btn btn-outline-primary" style={{float:'left',width:'200px'}}>Stock Out ( - )</button>
        </Col>
        </Row>
          <table class="table table-striped table-hover table-bordered responsive">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Stock Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        </Paper>
        </Grid>
        <Dialog
          title="Stock In"
          actions={Actions}
          modal={false}
          open={this.props.inventory.openStockIn}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
          bodyStyle={'auto'}
          contentStyle={dialogstyle}
        >
        <br/>
        <Grid>
          <Row>
            <Col md={4}>
              <h4 style={{float:'right'}}>Supplier:*</h4>
            </Col>
            <Col md={4} style={{paddingRight:'5px',paddingLeft:'5px'}}>
            <select multiple="" class="form-control" id="exampleSelect2" style={{width:'90%'}} onChange={this.handleChangeUnitField} name="unit">
              {
                this.props.addsupplier.data.map((supplier,index) => {
                  return (
                  <option value={supplier.company}>{supplier.firstName+" "+supplier.lastName}</option>
                  )
                })
              }
            </select>
            </Col>
          </Row>
        </Grid>
        <br/>

        <table class="table table-striped table-hover table-bordered responsive">
        <thead class="thead-dark">
          <tr>
            <th>Items</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.inventory.data.map((inventory,inventoryIndex) => {
              return(

                <tr>
            <td>
              <select multiple="" class="form-control" id="exampleSelect2" style={{width:'100%'}}  onChange={(e)=>this.changeProduct(e,inventoryIndex)} name="unit">
              {
                this.props.newproduct.data.map((products,productIndex) => {
                  return (
                    <option name="stockName" value={productIndex}>{products.stockName}</option>
                  )
                })
              }
              </select>
            </td>
            <td>
             <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">₱</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"/>
                  </div>
              </div>
            </td>
            <td>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="unit" style={{width:'90%'}}/>
            </td>
            <td>
              <select multiple="" class="form-control" id="exampleSelect2" style={{width:'100%'}} onChange={this.handleChangeUnitField} name="unit">
                <option value="Kg">Kg</option>
                <option value="Liter">Liter</option>
              </select>
            </td>
            <td>
              <select multiple="" class="form-control" id="exampleSelect2" style={{width:'100%'}} onChange={this.handleChangeUnitField} name="unit">
                <option value="Meat">Meat</option>
                <option value="Seafood">Seafood</option>
                <option value="Drinks">Drinks</option>
              </select>
            </td>
            <td>
              <FloatingActionButton backgroundColor='#F44336' mini={true} onClick={()=>this.deleteRows(inventoryIndex)}>
                <Clear />
              </FloatingActionButton>
            </td>
          </tr>
          )
        })
          }
         
        </tbody>
      </table>

      <Col md={6}>
        <button type="button" class="btn btn-primary" style={{width:'150px'}} onClick={this.addRows}>+ Add More Row</button>
      </Col>
      <br />
        </Dialog>
        <Dialog
          title="+Add New Supplier"
          actions={SupplierActions}
          modal={false}
          open={this.props.addsupplier.open}
          autoScrollBodyContent={true}
          onRequestClose={this.hanldeCloseSupplierModal}
        >
        <Col sm={9}style={{marginLeft:'14%'}}>
        <div class="form-group">
        <label for="exampleInputEmail1">First Name</label>
        <input name="lastName" onChange="" value="" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Last Name</label>
        <input name="lastName" onChange="" value="" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Company</label>
        <input name="lastName" onChange="" value="" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Address</label>
        <input name="lastName" onChange="" value="" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Contact Number</label>
        <input name="lastName" onChange="" value="" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
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
    product:state.product,
    newproduct:state.newproduct,
    addsupplier:state.addsupplier,
    inventory:state.inventory,
    category:state.category
  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    productaction: bindActionCreators(products,dispatch),
    addproduct: bindActionCreators(addproduct,dispatch),
    addsupplierActions: bindActionCreators(addsupplierActions,dispatch),
    inventoryActions: bindActionCreators(inventoryActions,dispatch),
    categoryActions: bindActionCreators(categoryActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Inventory);
