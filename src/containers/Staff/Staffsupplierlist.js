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
import Navlayout from '../Navlayout';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class Staffsupplierlist extends Component {
  constructor(props){
    super(props);
    this.state ={
      open:false
    }
  }

  handleOpen = () => {
   this.setState({open: true});
 };

 handleClose = () => {
   this.setState({open: false});
 };

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
          <h1>Supplier List</h1>
          <table class="table table-striped table-hover table-bordered responsive">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Company</th>
              <th>Adress</th>
              <th>Contact No.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Jerick Curiba</td>
              <td></td>
              <td>Loon,Bohol</td>
              <td>091204212</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jerick Curiba</td>
              <td></td>
              <td>Loon,Bohol</td>
              <td>091204212</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Jerick Curiba</td>
              <td>Curiba Farms</td>
              <td>Loon,Bohol</td>
              <td>091204212</td>
            </tr>
            <tr>
              <td>4</td>
              <td>John Bill Suarez</td>
              <td>Suarez Minimart</td>
              <td>Lindaville, Tagbilaran City, Bohol</td>
              <td>091204212</td>
            </tr>
          </tbody>
        </table>
        </Paper>
        </Grid>
                  </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Staffsupplierlist);
