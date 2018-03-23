import React, { Component } from 'react';
import {FormGroup,
        FormControl,
        ControlLabel,Col,Row,
        HelpBlock,Grid,
        Button,nav,span,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from '../Navlayout';
import Paper from 'material-ui/Paper';
import * as addsupplierActions from '../../actions/addnewsupplieractions';
import * as inventoryActions from '../../actions/inventoryactions';
import * as categoryActions from '../../actions/addcategory';
import * as productActions from '../../actions/newproductactions';
import * as addproductActions from '../../actions/addnewproductactions'
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';



class kitchenRequest extends Component {
  constructor(props){
    super(props);
    this.state={
      open:false
    }
  }

  componentWillMount()
  {
    this.props.inventoryActions.getInventory();
    this.props.productActions.getProducts();
  }

  saveStockOut = () => {
    this.props.inventoryActions.saveKitchenOut();
    this.setState({
      open:true
    })
  }

  handlequantityfield = (e) => {
    var name = e.target.value
    var value = e.target.value
    this.props.inventoryActions.handlequantityfield(value,name)
  }

  
 changeProduct = (e) => {
  var name = e.target.name
  var value = e.target.value
  this.props.inventoryActions.changeProduct(value,name)
}

handleRequestClose = () => {
  this.setState({
    open: false,
  });
};

render(){

  const paperstyle=
  {
    height: 'auto',
    width: 'auto',
    margin: 50,
    padding: 20,
    overflowX: 'auto'
  };

  return(
      <div>
        <Navlayout />
        <Grid>
        <Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
          <h1>Kitchen Out</h1>
          <Grid>
          <Row>
          <Col md={3}/>
          <Col md={2}/>
          <Col md={3}><p>(Current quantity: {this.props.inventory.inventory.length === 0 ? '' : this.props.inventory.inventory[this.props.inventory.selectedProduct].quantity})</p></Col>
          <Col md={2}/>
          <Col md={2}/>
        </Row>
        <Row>
            <Col md={3}>
              <select value={this.props.inventory.selectedProduct} class="form-control" id="exampleSelect2" style={{width:'100%'}} name="selectedProduct" onChange={this.changeProduct}>
                {
                  this.props.newproduct.data.length === 0 ? '' : this.props.newproduct.data.map((products,productIndex) => {
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
          <Col md={12} style={{padding:'2px'}}>
            <RaisedButton primary={true} label="Save" fullWidth={true} onClick={this.saveStockOut} />
          </Col>
          <Snackbar
          open={this.state.open}
          message="Request Success"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
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
    inventory: state.inventory,
    newproduct: state.newproduct,
    addproduct: state.addproduct,
    category: state.category
  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    inventoryActions: bindActionCreators(inventoryActions,dispatch),
    addproductActions: bindActionCreators(addproductActions,dispatch),
    productActions: bindActionCreators(productActions,dispatch),
    categoryActions: bindActionCreators(categoryActions,dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(kitchenRequest);
