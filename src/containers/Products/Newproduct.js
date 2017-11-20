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

  render() {
    const paperstyle=
    {
      height: 'auto',
      width: 'auto',
      margin: 50,
      padding: 20,
      overflowX: 'auto'
    };
    const actions = [
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}}>Save</button>,
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose} style={{marginRight:10}}>Close</button>,
    ];

    const CategoryActions = [
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}}>Save</button>,
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleCloseCategory} style={{marginRight:10}}>Close</button>,
    ];
    return (
      <div>
      <Navlayout open={this.handleOpen}/>
      <Dialog
          title="+Add New Stock"
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
        <div>
        <Grid>
        <Col sm={9}style={{marginLeft:'14%'}}>
        <div class="form-group">
        <label for="exampleInputEmail1">Category</label>
        <button type="button" class="btn btn-warning" style={{marginTop:'32px',marginLeft:'260px',position:'absolute',width:'163px'}} onClick={this.handleCloseCategory}>Add New</button>
          <select multiple="" class="form-control" id="exampleSelect2" style={{width:'65%'}}>
            <option>Meat</option>
            <option>Vegetables</option>
            <option>Seafoods</option>
            <option>Drinks</option>
          </select>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Stock Name</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Unit</label>
          <select multiple="" class="form-control" id="exampleSelect2" style={{width:'50%'}}>
            <option>Kg</option>
            <option>Litre</option>
          </select>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Timeframe</label>
          <div class="input-group">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div class="input-group-addon">Days</div>
          </div>
        </div>
        </Col>
        </Grid>
        </div>
        </Dialog>
        <Dialog
          title="+Add New Category"
          actions={CategoryActions}
          modal={false}
          open={this.state.openCategory}
          onRequestClose={this.handleCloseCategory}
        >
        <Col sm={9}style={{marginLeft:'14%'}}>
        <div class="form-group">
        <label for="exampleInputEmail1">Stock Name</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        </Col>
        </Dialog>
        <Grid>
        <Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
          <h1>Inventory</h1>
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
            <tr>
              <td>1</td>
              <td>Chicken</td>
              <td>Meat</td>
              <td></td>
              <td>5</td>
              <td>Kg</td>
              <td></td>
              <td></td>
              <td>Active</td>
              <td><button type="button" class="btn btn-warning">Edit</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Chicken</td>
              <td>Meat</td>
              <td></td>
              <td>5</td>
              <td>Kg</td>
              <td></td>
              <td></td>
              <td>Active</td>
              <td><button type="button" class="btn btn-warning">Edit</button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Chicken</td>
              <td>Meat</td>
              <td></td>
              <td>5</td>
              <td>Kg</td>
              <td></td>
              <td></td>
              <td>Active</td>
              <td><button type="button" class="btn btn-warning">Edit</button></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Chicken</td>
              <td>Meat</td>
              <td></td>
              <td>5</td>
              <td>Kg</td>
              <td></td>
              <td></td>
              <td>Active</td>
              <td><button type="button" class="btn btn-warning">Edit</button></td>
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

export default connect(mapStateToProps,mapDispatchToProps)(Manageproduct);
