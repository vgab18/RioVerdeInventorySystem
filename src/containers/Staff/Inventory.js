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
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';




class Inventory extends Component {
  constructor(props){
    super(props);

  }
  handleOpen = () => {
   this.props.inventoryActions.openStockIn();
 };

 handleOpenOut = () => {
   this.props.inventoryActions.openStockOut();
 }

 handleClose = () => {
   this.props.inventoryActions.closeStockIn();
 };

 handleCloseOut = () => {
   this.props.inventoryActions.closeStockOut();
 }

 saveAllRows = () => {
   this.props.inventoryActions.saveAllRows();
 }

 saveStockOut = () => {
   this.props.inventoryActions.saveStockOut();
 }

 addRows = () => {
   this.props.inventoryActions.addRows();
 }

 deleteRows =(i) => {
   this.props.inventoryActions.deleteRows(i);
 }


 changeProduct = (e) => {
   var name = e.target.name
   var value = e.target.value
   this.props.inventoryActions.changeProduct(value,name)
 }

 changeSupplier = (e) => {
   var name = e.target.name
   var value = e.target.value
   this.props.inventoryActions.changeSupplier(value,name)
 }

 handlePriceField = (e) => {
   var name = e.target.name
   var value = e.target.value
   this.props.inventoryActions.handlePriceField(value,name);
 }

 handlequantityfield = (e) => {
   var name = e.target.value
   var value = e.target.value
   this.props.inventoryActions.handlequantityfield(value,name)
 }




  componentWillMount()
    {
      this.props.productaction.getProducts();
      this.props.inventoryActions.getInventory();
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
      width:'80%',
      maxWidth:'none'
    }
    const Actions = [
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}} onClick={this.saveAllRows}>Save</button>,
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose} style={{marginRight:10}}>Close</button>,
    ];

    const actions = [
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}} onClick={this.saveStockOut}>Save</button>,
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleCloseOut} style={{marginRight:10}}>Close</button>,
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
          <button type="button" class="btn btn-outline-primary" style={{float:'left',width:'200px'}} onClick={this.handleOpenOut}>Stock Out ( - )</button>
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
            </tr>
          </thead>
          <tbody>
          {
            this.props.inventory.inventory.map ((inventory,i)=>{
              return(
            <tr>
              <td>{inventory.id}</td>
              <td>{inventory.product.stockName}</td>
              <td>{inventory.category.categoryName}</td>
              <td>{inventory.price}</td>
              <td>{inventory.quantity}</td>
              <td>{inventory.product.unit}</td>
              <td>{inventory.totalamount}</td>
            </tr>
              )
              })
          }
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
            <FormGroup controlId="formControlsSelect">
              <FormControl value={this.props.inventory.selectedSupplier} componentClass="select" placeholder="select" onChange={this.changeSupplier} name="selectedSupplier">
              {
                this.props.addsupplier.data.map((supplier,index) => {
                  return (
                  <option value={supplier.id}>{supplier.firstName+" "+supplier.lastName}</option>
                  )
                })
              }
              </FormControl>
            </FormGroup>
            </Col>
          </Row>
        </Grid>
        <br/>
        <Grid>
          <Row>
            <Col md={2}>
              <h5>Add Item:</h5>
            </Col>
            <Col md={3}>
            </Col>
            <Col md={3}>
            </Col>
            <Col md={2} style={{textAlign:'center'}}>
              <h5>Unit</h5>
            </Col>
            <Col md={2} style={{textAlign:'center'}}>
              <h5>Category</h5>
            </Col>

          </Row>
          <Row>
            <Col md={2}>
              <select value={this.props.inventory.selectedProduct} class="form-control" id="exampleSelect2" style={{width:'100%'}} name="selectedProduct" onChange={this.changeProduct}>
                {
                  this.props.newproduct.data.map((products,productIndex) => {
                    return (
                      <option value={productIndex}>{products.stockName}</option>
                    )
                  })
                }
              </select>
            </Col>
            <Col md={3}>
              <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">₱</span>
                    </div>
                    <input type="number" value={this.props.inventory.price} name="price" class="form-control" aria-label="Amount (to the nearest dollar)" placeholder="price" onChange={this.handlePriceField}/>
                  </div>
              </div>
            </Col>
            <Col md={3}>
              <input type="number" onChange={this.handlequantityfield} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="quantity" value={this.props.inventory.quantity}  name="quantity" style={{width:'100%'}}/>
            </Col>
            <Col md={2} style={{textAlign:'center'}}>
              <p style={{textStyle:'bold',fontSize:'20px'}}>{this.props.newproduct.data.length  === 0 ? '' : this.props.newproduct.data[this.props.inventory.selectedProduct].unit || ''}</p>
            </Col>
            <Col md={2} style={{textAlign:'center'}}>

              <p style={{textStyle:'bold',fontSize:'20px'}}>{this.props.newproduct.data.length  === 0 ? '' : this.props.newproduct.data[this.props.inventory.selectedProduct].category.categoryName}</p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <RaisedButton label="+ADD" primary={true} fullWidth={true} onClick={this.addRows}/>
            </Col>
          </Row>
        </Grid>
        <br />
        <br />
        <Divider />
        <br />
        <br />
        <Grid>
          <Row>
            <Col md={3}>
                <h5>List of added Items:</h5>
            </Col>
          </Row>
        </Grid>
          <table class="table table-striped table-hover table-bordered responsive">
        <thead class="thead-dark">
          <tr>
            <th>Items</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Category</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody style={{textSize:'30px'}}>
          {
            this.props.inventory.inventorydata.map ((inventory,i)=>{
          return (
            <tr>
            <td>{inventory.stockName}</td>
            <td>{inventory.price}</td>
            <td>{inventory.quantity}</td>
            <td>{inventory.unit}</td>
            <td>{inventory.categoryName}</td>
            <td>{inventory.totalamount}</td>
            <td>
              <FloatingActionButton backgroundColor='#F44336' mini={true} onClick={()=>this.deleteRows(i)}>
                <Clear />
              </FloatingActionButton>
            </td>
          </tr>
              )
            })
          }
        </tbody>

      </table>

      <br />
        </Dialog>
        <Dialog
          title="Stock Out"
          actions={actions}
          modal={false}
          open={this.props.inventory.openStockOut}
          onRequestClose={this.handleCloseOut}
          bodyStyle={'auto'}
          contentStyle={dialogstyle}
          autoScrollBodyContent={true}
        >
        <br/>
        <Grid>
        <Row>
            <Col md={3}>
              <select value={this.props.inventory.selectedProduct} class="form-control" id="exampleSelect2" style={{width:'100%'}} name="selectedProduct" onChange={this.changeProduct}>
                {
                  this.props.newproduct.data.map((products,productIndex) => {
                    return (
                      <option value={productIndex}>{products.stockName}</option>
                    )
                  })
                }
              </select>
            </Col>
            <Col md={2}>
            <p style={{textStyle:'bold',fontSize:'25px'}}>₱  {this.props.inventory.inventory.length === 0 ? '' : this.props.inventory.inventory[this.props.inventory.selectedProduct].price}</p>
            </Col>
            <Col md={3}>
              <input type="number" onChange={this.handlequantityfield} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="quantity" value={this.props.inventory.quantity}  name="quantity" style={{width:'100%'}}/>
            </Col>
            <Col md={2} style={{textAlign:'center'}}>
              <p style={{textStyle:'bold',fontSize:'25px'}}>{this.props.newproduct.data.length  === 0 ? '' : this.props.newproduct.data[this.props.inventory.selectedProduct].unit || ''}</p>
            </Col>
            <Col md={2} style={{textAlign:'center'}}>

              <p style={{textStyle:'bold',fontSize:'25px'}}>{this.props.newproduct.data.length  === 0 ? '' : this.props.newproduct.data[this.props.inventory.selectedProduct].category.categoryName}</p>
            </Col>
          </Row>
        </Grid>
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
    categoryActions: bindActionCreators(categoryActions,dispatch),

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Inventory);
