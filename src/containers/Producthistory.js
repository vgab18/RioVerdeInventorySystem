import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,Grid,Col,
        Button,nav,Row,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from './Navlayout';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Producthistory extends Component {
  constructor(props){
    super(props);
    this.state ={
      value:1,
    }
  }

  handleChange = (event, index, value) => this.setState({value});


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
            <Navlayout/>
            <Grid>
            <Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
            <Row>
              <Col md={6}>
                <h1>Product History</h1>
              </Col>
              <Col md={6} mdOffset={6}>
                <SelectField
                value={this.state.value}
                menuItemStyle={{textAlign:'center'}}
                onChange={this.handleChange}
                style={{float:'right',textAlign:'center',width:'170px'}}>
                <MenuItem value={1} primaryText="Daily" />
                <MenuItem value={2} primaryText="Weekly" />
                <MenuItem value={3} primaryText="Monthly" />
                </SelectField>
              </Col>
            </Row>
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
                <tr>
                  <td>1</td>
                  <td>May 5, 2017</td>
                  <td>OUT</td>
                  <td>Chicken</td>
                  <td>Meat</td>
                  <td>150.00</td>
                  <td>4</td>
                  <td>Kg</td>
                  <td>600.00</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>May 5, 2017</td>
                  <td>IN</td>
                  <td>Chicken</td>
                  <td>Meat</td>
                  <td>150.00</td>
                  <td>4</td>
                  <td>Kg</td>
                  <td>600.00</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>May 5, 2017</td>
                  <td>OUT</td>
                  <td>Chicken</td>
                  <td>Meat</td>
                  <td>150.00</td>
                  <td>4</td>
                  <td>Kg</td>
                  <td>600.00</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>May 5, 2017</td>
                  <td>IN</td>
                  <td>Chicken</td>
                  <td>Meat</td>
                  <td>150.00</td>
                  <td>4</td>
                  <td>Kg</td>
                  <td>600.00</td>
                  <td>2</td>
                </tr>
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
  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Producthistory);
