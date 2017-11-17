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



class Adduser extends Component {
  constructor(props){
    super(props);
    this.state ={
      open:true
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
    this.props.adduserActions.addUser();
    this.props.userActions.getUsers();
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
      title="+Add New User"
      actions={actions}
      modal={false}
      autoScrollBodyContent={true}
      open={this.props.adduser.open}
      onRequestClose={this.handleClose}
      >
      <Grid>
      <Col sm={9}style={{marginLeft:'14%'}}>
        <form>
          <fieldset>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
              <FormControl onChange={this.handleselectChange()} componentClass="select" placeholder="select">
                    <option value="staff">Staff</option>
                    <option value="kitchen">Kitchen</option>
              </FormControl>
          </FormGroup>
            <div class="form-group">
            <label for="exampleInputEmail1">First Name</label>
            <input name="firstName" onChange={this.handleChange()} value={this.props.adduser.firstName} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
            <label for="exampleInputEmail1">Last Name</label>
            <input name="lastName" onChange={this.handleChange()} value={this.props.adduser.lastName} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
            <label for="exampleInputEmail1">Address</label>
            <input name="address" onChange={this.handleChange()} value={this.props.adduser.address} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
            <label for="exampleInputEmail1">Contact No.</label>
            <input name="contactNo" onChange={this.handleChange()} value={this.props.adduser.contactNo} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <Row>
            <label for="exampleInputEmail1">
            <Col md={4}>
              Gender
              </Col>
            </label>
            <RadioButtonGroup
                name="gender"
                defaultSelected="Male"
                valueSelected={this.props.adduser.gender}
                onChange={this.handleChange()}>

                <RadioButton
                value="Male"
                label="Male"/>

                <RadioButton
                value="Female"
                label="Female"/>

            </RadioButtonGroup>
              </Row>
            <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input name="userName" onChange={this.handleChange()} value={this.props.adduser.userName} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
            <label for="exampleInputEmail1">Password</label>
            <input name="password" onChange={this.handleChange()} value={this.props.adduser.password} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
            <label for="exampleInputEmail1">Confirm Password</label>
            <input name="seepassword" onChange={this.handleChange()} value={this.props.adduser.seepassword} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
          </fieldset>
        </form>
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
    adduser:state.adduser

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
