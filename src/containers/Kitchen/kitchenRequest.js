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


class kitchenRequest extends Component {
  constructor(props){
    super(props);
  }

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
          <h1>Request Stock</h1>
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
        <Col md={12}>
          <button type="button" class="btn btn-primary" style={{width:'150px'}} >+ Add More Row</button>
        </Col>
        <Row>
          <Col md={6} style={{padding:'2px'}}>
            <button type="button" class="btn btn-info" style={{width:'190px',float:'right'}}>Request</button>
          </Col>
          <Col md={5} style={{padding:'2px'}}>
            <button type="button" class="btn btn-secondary" style={{width:'150px'}}>Reset</button>
          </Col>
        </Row>
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


export default connect(mapStateToProps,mapDispatchToProps)(kitchenRequest);
