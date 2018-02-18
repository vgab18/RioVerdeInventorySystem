import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Col,Grid,Row,
        HelpBlock,
        Button,nav,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from './Navlayout';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as addsupplierActions from '../actions/addnewsupplieractions';


class Supplierlist extends Component {
  constructor(props){
    super(props);
    this.state ={
      open:false
    }
  }

  componentWillMount(){
    this.props.addsupplierActions.getSuppliers();
  }

  handleOpenSupplierModal = () => {
    this.props.addsupplierActions.OpenAddSupplierModal();
  }

  handleCloseSupplierModal = () => {
   this.props.addsupplierActions.CloseAddSupplierModal();
  }

  handleChange = () => {
    return (e) => {
      var name = e.target.name;
      var value = e.target.value;

      this.props.addsupplierActions.handleChange(name,value)
    }
  }


    handleOpen = () => {
     this.setState({open: true});
   };

   handleClose = () => {
     this.setState({open: false});
   };

   openmodal =(id) => {
     this.props.addsupplierActions.getSupplierData(id)
   }

   addSupplier = () => {
     if (this.props.addsupplier.edit) {
       this.props.addsupplierActions.saveSupplier();
       this.props.addsupplierActions.getSuppliers();
     }
     else {
       this.props.addsupplierActions.addSupplier();
       this.props.addsupplierActions.getSuppliers();
     }
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
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}}  onClick={this.addSupplier}>Save</button>,
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleCloseSupplierModal} style={{marginRight:10}}>Close</button>,
    ];
    const modalscroll={
      overflow: 'auto',
      height: '90%'
    }
    return (
      <div>
              <Navlayout open={this.handleOpen}/>
        <div>
        <Grid>
        <Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
        <Row>
        <Col md={6}>
          <h1>Supplier List</h1>
        </Col>
        <Col md={6}>
          <button type="button" class="btn btn-primary" style={{float:'right'}} onClick={this.handleOpenSupplierModal}>+Add Supplier</button>
        </Col>
        </Row>
          <table class="table table-striped table-hover table-bordered responsive">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Company</th>
              <th>Adress</th>
              <th>Contact No.</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {this.props.addsupplier.data.map((supplier,index) => {
              return(
                <tr>
                  <td>{supplier.id}</td>
                  <td>{supplier.firstName+" "+supplier.lastName}</td>
                  <td>{supplier.company}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.contactNo}</td>
                  <td>{supplier.status ? "Active" : "Inactive"}</td>
                  <td><button type="button" class="btn btn-warning" onClick={()=>this.openmodal(supplier.id)}>Edit</button></td>
                </tr>
              )
          })}
          </tbody>
        </table>
        </Paper>
        </Grid>

        <Dialog
          title={this.props.addsupplier.edit? "+Edit Supplier" : "+Add New Supplier"}
          actions={actions}
          modal={false}
          open={this.props.addsupplier.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleCloseSupplierModal }
        >
        <Col sm={9}style={{marginLeft:'14%'}}>
        <div class="form-group">
        <label for="exampleInputEmail1">First Name</label>
        <input name="firstName" onChange={this.handleChange()} value={this.props.addsupplier.firstName} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Last Name</label>
        <input name="lastName" onChange={this.handleChange()}  value={this.props.addsupplier.lastName} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Company</label>
        <input name="company" onChange={this.handleChange()}  value={this.props.addsupplier.company} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Address</label>
        <input name="address" onChange={this.handleChange()}  value={this.props.addsupplier.address} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Contact Number</label>
        <input name="contactNo" onChange={this.handleChange()}  value={this.props.addsupplier.contactNo} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>

        </Col>
        </Dialog>

        </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return{
    router: state.router,
    auth: state.auth,
    addsupplier:state.addsupplier
  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    addsupplierActions: bindActionCreators(addsupplierActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Supplierlist);
