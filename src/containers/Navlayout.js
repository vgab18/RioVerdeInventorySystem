import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,
        ButtonGroup,
        DropdownButton,Grid,Modal,
      MenuItem,Glyphicon} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adduser from '../actions/adduseractions';
import * as userAction from '../actions/useractions';
import * as addproduct from '../actions/addnewproductactions';
import * as productAction from '../actions/newproductactions';
import * as categoryActions from '../actions/categoryactions';
import * as authActions from '../actions/authactions';

import StaffNav from './NavBars/StaffNav'
import AdminNav from './NavBars/AdminNav'

class Navlayout extends Component {
  constructor(props){
    super(props);
    this.state ={
      open:true,

    }
  }

  openmodal =() => {
    this.props.adduser.openAddUser()
  }

  openproductmodal = () => {
    this.props.addproduct.openAddproduct();
    this.props.categoryActions.getCategory();

  }

  renderLinks(){
    switch (this.props.auth.account.role) {
      case "admin":
        return <AdminNav />
      case "Staff":
        return <StaffNav />
      case "kitchen":
        return

      default:
        return null
    }
  }

  render() {
    return (
      <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-primary" styles="">
          <Grid>
          <a className="navbar-brand" href="#" onClick={()=>this.props.routerActions.push("/")}>Inventory System</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" styles="">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">

            {this.renderLinks()}

            <form className="form-inline my-2 my-lg-0">
              <ul className="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                             <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><b>{this.props.auth.account.userName}</b></a>
                             <div class="dropdown-menu">
                                 <a class="dropdown-item" onClick={this.props.authActions.logout}>Logout</a>
                             </div>
                           </li>
              </ul>
            </form>
          </div>
          </Grid>
            </nav>
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
    routerActions: bindActionCreators(routerActions,dispatch),
    addproduct: bindActionCreators(addproduct,dispatch),
    productAction: bindActionCreators(productAction, dispatch),
    adduser: bindActionCreators(adduser,dispatch),
    categoryActions:bindActionCreators(categoryActions,dispatch),
    authActions: bindActionCreators(authActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navlayout);
