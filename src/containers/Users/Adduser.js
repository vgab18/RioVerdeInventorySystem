import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Row,
        HelpBlock,
        Button,nav,
        ButtonGroup,Grid,Modal,Col} from 'react-bootstrap';
import {RadioButtonGroup,RadioButton} from 'material-ui';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from '../Navlayout';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import * as adduserActions from '../../actions/adduseractions';
import * as userActions from '../../actions/useractions';
import AddUserForm from './Adduser';



class Adduser extends Component {
  constructor(props){
    super(props);
    this.state ={
      open:true
    }
  }


  componentWillMount(){
    if(this.props.adduser.id){

    }
  }
  handleOpen = () => {
   this.setState({open: true});
 };

 handleClose = () => {
   this.props.adduserActions.closeAdduser();
 };

 handleChange = () => {
   return (e) => {
     var name = e.target.name;
     var value = e.target.value;
     this.props.adduserActions.handleChange(name,value)
   }
 }

 handleselectChange = () => {
   return(e) =>{
     var name = 'role';
     var value = e.target.value;
     this.props.adduserActions.handleChange(name,value)
 }
}

  addUser = () => {
    if (this.props.adduser.edit) {
      this.props.adduserActions.saveUser();
      this.props.userActions.getUsers();
    }
    else {
      this.props.adduserActions.addUser();
      this.props.userActions.getUsers();
    }
  }
render(){

  const actions = [
    <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}} onClick={this.addUser}>Save</button>,
    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose} style={{marginRight:10}}>Close</button>,
  ];
  const modalscroll={
    overflow: 'auto',
    height: '90%'
  }
  return(
    <Dialog
      title={this.props.adduser.edit ? "+Edit User" : "+Add New User" }
      actions={actions}
      modal={false}
      autoScrollBodyContent={true}
      open={this.props.adduser.open}
      onRequestClose={this.handleClose}
      >
      <Grid>
      <Col sm={9}style={{marginLeft:'14%'}}>
        <AddUserForm 
          {...this.props}
          handleselectChange={this.handleselectChange} 
          handleChange={this.handleChange}
        />
        </Col>
        </Grid>
    </Dialog>
    )
  }

}


function mapStateToProps(state) {
  return{
    router: state.router,
    auth: state.auth,
    adduser:state.adduser,

  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    adduserActions: bindActionCreators(adduserActions,dispatch),
    userActions: bindActionCreators(userActions,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Adduser);
