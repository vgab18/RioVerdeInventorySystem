import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,Grid,Col,
        Button,nav,Row,
        ButtonGroup,Tooltip,OverlayTrigger} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from './Navlayout';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import * as inventoryactions from '../actions/inventoryactions';
import moment from 'moment';
import Print from 'material-ui/svg-icons/action/print';



class Producthistory extends Component {
  constructor(props){
    super(props);
    this.state ={
      value:1,
    }
  }

  handleChange = (event, index, value) => this.setState({value});

  printproducthist = () => {
   window.print();
 }

 print = () => {
  window.print();
}

 componentWillMount()
    {
      this.props.inventoryactions.getProductHistory();
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
      const style = {
      margin: 12,
      float: 'right',
      textAlign:'center',
      width:'150px'
      };

    return (
      <div>
            <Navlayout/>
            <Grid>
            <Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
            <Row>
                <Col md={6}>
                  <h1>Product History</h1>
                </Col>
                <Col md={6} mdOffset={6}>
                  <RaisedButton className="d-print-none" style={style} onClick={this.print}><Print style={{color:'black'}}/></RaisedButton>
                </Col>
              </Row>
              <Col md={12}>
              <SelectField
                  value={this.state.value}
                  menuItemStyle={{textAlign:'center'}}
                  onChange={this.handleChange}
                  style={{textAlign:'center',width:'300px',margin:12}}>
                  <MenuItem value={1} primaryText="Daily" />
                  <MenuItem value={2} primaryText="Weekly" />
                  <MenuItem value={3} primaryText="Monthly" />
                  </SelectField>
              </Col>
              <table class="table table-striped table-hover table-bordered responsive">
              <thead class="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Stock Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Total Amount</th>
                  <th>User Id</th>
                </tr>
              </thead>
              <tbody>
              {
       this.props.inventory.producthistory.map ((producthistory,i) =>{
        return (
            <tr>
              <td>{producthistory.id}</td>
              <td>{moment(producthistory.createdAt).format('LLL')}</td>
              <td>{producthistory.actionType}</td>
              <td>{producthistory.product.stockName}</td>
              <td>{producthistory.category.categoryName}</td>
              <td>₱ {producthistory.price}</td>
              <td>{producthistory.quantity}</td>
              <td>{producthistory.product.unit}</td>
              <td>₱ {producthistory.totalamount}</td>
              <td>{producthistory.user.id}</td>
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
    inventory:state.inventory,
  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    inventoryactions: bindActionCreators(inventoryactions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Producthistory);
