import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,nav,
        ButtonGroup,Col,Grid,Row} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from './Navlayout';
import {TextField,Paper} from 'material-ui';
import sendButton from '../Style/images/button.png';
import * as messageActions from '../actions/messageActions';


class Messagepage extends Component {
  constructor(props){
    super(props);
    this.state ={
      Message:""
    }
  }

  handlechange =(e)=>{
    let value = e.target.value
    let name = e.target.name
    this.props.messageActions.handleChangeMessage(name,value)
  }


  render() {

      const messagestyle=
      {
        height: '500',
        width: '500',
        margin: 30,
        padding: 20,
        overflowX: 'auto',
        textAlign: 'center',
        display: 'inline-block',
      };
      const paperstyle=
      {
        height: 'auto',
        width: 'auto',
        margin:50,
        padding: 20,
        overflowX: 'auto'
      };

    return (
      <div>
          <Navlayout/>
          <Grid>
          <Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
            <Row>
                <Col md={3}>
                  <h1>+Message</h1>
                </Col>
            </Row>
            <Row>
              <Col md={10} style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Supplier's Number</ControlLabel>
                    <FormControl componentClass="select"
                   placeholder="select">
                         <option value="staff">Number Sa supplier</option>
                         <option value="kitchen">Number Sa supplier</option>
                   </FormControl>
               </FormGroup>
               </Col>
                   <Col md={12} style={{textAlign:'center'}}>
                  <Paper style={{marginRight:50,marginLeft:50,padding: 20,marginTop:20}} zDepth={2} transitionEnabled={true}>
                  <form>
                    <TextField
                     hintText="Enter Message Here"
                     multiLine={true}
                     fullWidth={true}
                     name="Message"
                     rows={3}
                     rowsMax={5}
                     value={this.props.message.Message}
                     onChange={this.handlechange}
                    />
                    </form>
                  </Paper>
                </Col>
                 <legend style={{marginLeft:'50%',marginRight:'50%',marginTop:20}}><img src={sendButton} width="70"/></legend>
            </Row>
            </Paper>
          </Grid>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return{
    router: state.router,
    auth: state.auth,
    message:state.message,
  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    messageActions: bindActionCreators(messageActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Messagepage);
