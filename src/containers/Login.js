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
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }


  render() {

    return (
      <div>
      <center>
      <div>
      <Grid style={{marginTop:'80px'}}>
          <Row style={{align:'center'}}>
          <Col md={12}>
          <Col md={4}/>
          <Col md={4} style={{padding:15,borderStyle:'solid',textAlign:'center'}}>
             <legend style={{marginTop:'10px'}}>User Login</legend>
             <form>
                 <FormGroup>
                         <TextField
                             floatingLabelText="Username"
                             style={{width:'310px'}}
                             inputStyle={{color:'#0F3057',fontSize:20}}
                           />
                     <HelpBlock> </HelpBlock>
                 </FormGroup>
                 <FormGroup>
                   <TextField
                       floatingLabelText="Password"
                       style={{width:'310px'}}
                       inputStyle={{color:'#0F3057',fontSize:20}}
                       type="password"
                     />
                     <HelpBlock> </HelpBlock>
                 </FormGroup>
                 <div className="button">
                     <ButtonGroup>
                         <Button  bsStyle="primary" type="submit" style={{width:'250px',marginTop:'40px',marginBottom:'80px'}}
                         onClick={()=>this.props.routerActions.push("/users")}>Login</Button>
                     </ButtonGroup>
                 </div>
             </form>
             </Col>
             <Col md={4}/>
             </Col>
             </Row>
             </Grid>
            </div>
          </center>
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
