import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Grid,Col,Row,
        HelpBlock,Image,
        Button,
        ButtonGroup} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Paper from 'material-ui/Paper';
import logo from '../Style/images/logo.jpg';
import TextField from 'material-ui/TextField';




class Login extends Component {
  render() {

    return (
      <div>
      <Grid style={{marginTop:'80px'}}>
          <Row>
          <Col md={5} mdOffset={1} style={{padding:15,borderStyle:'solid',backgroundColor:'white',textAlign:'center'}}>
          <div style={{height:'380px'}}>
            <legend>Inventory System</legend>
            <Image src={logo} style={{width:'400px',height:'350px'}}/>
          </div>
          </Col>
          <Col md={5} style={{padding:15,borderStyle:'solid',backgroundColor:'white',textAlign:'center'}}>
             <legend style={{marginTop:'10px'}}>User Login</legend>
             <form>
                 <FormGroup>
                         <TextField
                             hintText="Text Field"
                             floatingLabelText="Username"
                             style={{width:'310px'}}
                             inputStyle={{color:'#0F3057',fontSize:20}}
                           />
                     <HelpBlock> </HelpBlock>
                 </FormGroup>
                 <FormGroup>
                   <TextField
                       hintText="Text Field"
                       floatingLabelText="Password"
                       style={{width:'310px'}}
                       inputStyle={{color:'#0F3057',fontSize:20}}
                       type="password"
                     />
                     <HelpBlock> </HelpBlock>
                 </FormGroup>
                 <div className="button">
                     <ButtonGroup>
                         <Button  bsStyle="default" type="submit"
                         onClick={()=>this.props.routerActions.push("/users")}>Login</Button>
                     </ButtonGroup>
                 </div>
             </form>
             </Col>
             </Row>
        </Grid>
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
