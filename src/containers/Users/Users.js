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




class Users extends Component {

  componentWillMount()
    {
      this.props.useraction.getUsers();
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
      <Adduser/>

        <div>
<Grid>
<Paper style={paperstyle} zDepth={2} transitionEnabled={true}>
  <h1>User List</h1>
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
      <td><button type="button" class="btn btn-warning">Edit</button></td>
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

  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch),
    useraction: bindActionCreators(users,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);
