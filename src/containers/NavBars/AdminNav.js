import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

class AdminNav extends Component {

    render(){
        return(
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a class="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>this.props.routerActions.push("/users")}>User List</a>
              </li>
              <li className="nav-item">
                <a class="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>this.props.routerActions.push("/manageproduct")}>Manage Stock</a>
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
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return{
        routerActions: bindActionCreators(routerActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminNav)