import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,nav,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from './Navlayout';

class Producthistory extends Component {
  render() {
    // const wellStyle={
    //        width: 400,
    //        height: 500,
    //        marginLeft: 'auto',
    //        marginRight: 'auto',
    //        marginTop: 80,
    //        backgroundColor:'red'
    //                 }
    return (
      <div>
              <Navlayout/>
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

export default connect(mapStateToProps,mapDispatchToProps)(Producthistory);
