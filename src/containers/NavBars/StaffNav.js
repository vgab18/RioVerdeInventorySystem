import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';


class StaffNav extends Component {

    render(){
        return(
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a class="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>this.props.routerActions.push("/inventory")}>Inventory</a>
              </li>
              <li className="nav-item">
                <a class="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" onClick={()=>this.props.routerActions.push("/staffsupplierlist")}>Supplier List</a>
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

export default connect(mapStateToProps,mapDispatchToProps)(StaffNav)
