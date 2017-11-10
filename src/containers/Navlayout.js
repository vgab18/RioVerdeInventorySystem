import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,
        ButtonGroup,
        DropdownButton,
      MenuItem} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Navlayout extends Component {
  render() {
    return (
      <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-primary" styles="">
          <a className="navbar-brand" href="#" onClick={()=>this.props.routerActions.push("/")}>Inventory System</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" styles="">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">

            <ul className="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>this.props.routerActions.push("/users")}>User List</a>
              <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Add User</a>
              </div>
            </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>this.props.routerActions.push("/manageproduct")}>Manage Product</a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Add</a>
                    <a class="dropdown-item" href="#">Update</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={()=>this.props.routerActions.push("/producthistory")}>Product History</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={()=>this.props.routerActions.push("/transactionhistory")}>Transaction History</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={()=>this.props.routerActions.push("/supplierlist")}>Supplier List</a>
              </li>


            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={()=>this.props.routerActions.push("/")}>Logout</button>
            </form>
          </div>
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
    routerActions: bindActionCreators(routerActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navlayout);
