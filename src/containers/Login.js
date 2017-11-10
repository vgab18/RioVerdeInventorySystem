import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Login extends Component {
  render() {
    const wellStyle={
           width: 400,
           height: 500,
           marginLeft: 'auto',
           marginRight: 'auto',
           marginTop: 80,
          //  backgroundColor:'red'
                    }
    return (
      <div className="container">
          <Well style={wellStyle}>
             <legend>Rio Verde Inventory System</legend>
             <form>
                 <FormGroup>
                         <ControlLabel>Enter Username </ControlLabel>
                     <FormControl
                         type='text'
                         placeholder='Enter Your Username'/>
                 <FormControl.Feedback/>
                     <HelpBlock> </HelpBlock>
                 </FormGroup>
                 <FormGroup>
                         <ControlLabel>Enter Password </ControlLabel>
                     <FormControl
                         type='password'
                         placeholder='Enter Your Password'/>
                 <FormControl.Feedback/>
                     <HelpBlock> </HelpBlock>
                 </FormGroup>
                 <div className="button">
                     <ButtonGroup>
                         <Button  bsStyle="default" type="submit"
                         onClick={()=>this.props.routerActions.push("/users")}>Login</Button>
                     </ButtonGroup>
                 </div>
             </form>
          </Well>
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);
