import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Col,Row,
        HelpBlock,Grid,
        Button,nav,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from './Navlayout';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class Transactionhistory extends Component {
  constructor(props){
    super(props);
    this.state ={
      value:1,
    }
  }

  print = () => {
   window.print();
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
                  <h1>Transaction History</h1>
                </Col>
                <Col md={6} mdOffset={6}>
                  <SelectField
                  value={this.state.value}
                  menuItemStyle={{textAlign:'center'}}
                  onChange={this.handleChange}
                  style={{float:'right',textAlign:'center',width:'170px',margin:12}}>
                  <MenuItem value={1} primaryText="Daily" />
                  <MenuItem value={2} primaryText="Weekly" />
                  <MenuItem value={3} primaryText="Monthly" />
                  </SelectField>
                  <RaisedButton className="d-print-none" label="Print" style={style} onClick={this.print}/>
                </Col>
              </Row>
                <table class="table table-striped table-hover table-bordered responsive">
                <thead class="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Supplier Name</th>
                    <th>Stock Name</th>
                    <th>Company</th>
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
                    <td>Jerick Curiba</td>
                    <td>Marcela Farms</td>
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
                    <td>Margie Macalinao</td>
                    <td>N/A</td>
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
                    <td>Carlo Lapinig</td>
                    <td>Alturas Mall</td>
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
                    <td>John Bill Suarez</td>
                    <td>Suarez Minimart</td>
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

export default connect(mapStateToProps,mapDispatchToProps)(Transactionhistory);
