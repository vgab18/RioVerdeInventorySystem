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
import _ from 'lodash'

class Inventory extends Component {
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
          <button type="button" class="btn btn-outline-primary" style={{float:'right',width:'200px'}} onClick={this.handleOpen}>Stock In</button>
        </Col>
        <Col md={6} style={{paddingLeft:'3px'}}>
          <button type="button" class="btn btn-outline-primary" style={{float:'left',width:'200px'}}>Stock Out</button>
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
              <th>Timeframe/Days</th>
              <th>Total Amount</th>
              <th>Status</th>
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
          open={this.state.open}
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
            <select multiple="" class="form-control" id="exampleSelect2" style={{width:'100%'}} onChange={this.handleChangeUnitField} name="unit">
              <option value="Chicken">Alturas</option>
              <option value="Pork">ICM</option>
              <option value="Coke">Suarez Minimart</option>
            </select>
            </Col>
            <Col md={4}>
              <button type="button" class="btn btn-primary" style={{width:'133px',margin:'auto'}} onClick={this.handleOpen}>+Add Supplier</button>
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
          <tr>
            <td>
              <select multiple="" class="form-control" id="exampleSelect2" style={{width:'100%'}} onChange={this.handleChangeUnitField} name="unit">
                <option value="Chicken">Chicken</option>
                <option value="Pork">Pork</option>
                <option value="Coke">Coke</option>
              </select>
            </td>
            <td>
              <div class="input-group">
              <div class="input-group-addon">₱</div>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="price" style={{width:'90%'}}/>
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
          </tr>
          <tr>
            <td>
              <select multiple="" class="form-control" id="exampleSelect2" style={{width:'100%'}} onChange={this.handleChangeUnitField} name="unit">
                <option value="Chicken">Chicken</option>
                <option value="Pork">Pork</option>
                <option value="Coke">Coke</option>
              </select>
            </td>
            <td>
              <div class="input-group">
              <div class="input-group-addon">₱</div>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="price" style={{width:'90%'}}/>
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
          </tr>
        </tbody>
      </table>

      <Col md={6}>
        <button type="button" class="btn btn-primary" style={{width:'150px'}}>+ Add More Row</button>
      </Col>
      <br />
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
    newproduct:state.newproduct

  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    productaction: bindActionCreators(products,dispatch),
    addproduct: bindActionCreators(addproduct,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Inventory);
