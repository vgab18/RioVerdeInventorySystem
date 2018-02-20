import React, { Component } from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,Row,
        HelpBlock,
        Button,nav,
        ButtonGroup,Grid,Modal,Col} from 'react-bootstrap';
import {routerActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navlayout from '../Navlayout';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import * as users from '../../actions/useractions';
import Adduser from './Adduser';
import * as adduserActions from '../../actions/adduseractions';





class Users extends Component {
  constructor(props){
    super(props);
    this.state ={
      open:true
    }
  }

  openmodal =(id) => {
    this.props.adduserActions.getUserData(id)

  }

  openusermodal =() => {
    this.props.adduserActions.openAddUser()
  }


  componentWillMount()
    {
      this.props.users.getUsers();
    }

  render() {
    const paperstyle=
    {
      height: 'auto',
      width: 'auto',
      margin: 50,
      padding: 20,
      overflowX: 'auto'
    };
    return (
      <div>
      <Navlayout open={this.handleOpen}/>
      <Adduser
        {...this.props}
      />

        <div>
<Grid>
<Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
<Row>
        <Col md={6}>
          <h1>User List</h1>
        </Col>
        <Col md={6}>
          <button type="button" class="btn btn-primary" style={{float:'right'}} onClick={this.openusermodal}>+Add User</button>
        </Col>
        </Row>
  <table class="table table-striped table-hover table-bordered responsive">
  <thead class="thead-dark">
    <tr>
      <th>#</th>
      <th>Full Name</th>
      <th>Adress</th>
      <th>Contact No.</th>
      <th>Gender</th>
      <th>Role</th>
      <th>UserName</th>
      <th>Password</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>

{
  this.props.user.data.map ((profile,i) => {
    return (
      <tr>
      <td>{profile.id}</td>
      <td>{profile.firstName+" "+profile.lastName}</td>
      <td>{profile.address}</td>
      <td>{profile.contactNo}</td>
      <td>{profile.gender}</td>
      <td>{profile.role}</td>
      <td>{profile.userName}</td>
      <td>{profile.password}</td>
      <td>{profile.status ? 'Active': 'Inactive' }</td>
      <td><button type="button" class="btn btn-warning" onClick={()=>this.openmodal(profile.id)}>Edit</button></td>
      </tr>
    )
  })
}

  </tbody>
</table>
</Paper>
</Grid>
          </div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return{
    router: state.router,
    auth: state.auth,
    user:state.user,
    adduser: state.adduser,

  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    users: bindActionCreators(users,dispatch),
    adduserActions: bindActionCreators(adduserActions,dispatch)

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);
