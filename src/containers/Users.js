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

class Users extends Component {
  render() {
    return (
      <div>
      <Navlayout/>
        <div>
              <h1>User List</h1>
              <table class="table table-striped table-hover table-bordered">
  <thead class="thead-dark">
    <tr>
      <th>#</th>
      <th>Full Name</th>
      <th>Adress</th>
      <th>Contact No.</th>
      <th>Gender</th>
      <th>Age</th>
      <th>Role</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Jerick Curiba</td>
      <td>Loon,Bohol</td>
      <td>091204212</td>
      <td>Male</td>
      <td>20</td>
      <td>Admin</td>
      <td><button type="button" class="btn btn-warning">Edit</button></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Carlo Lapinig</td>
      <td>Loay,Bohol</td>
      <td>091204212</td>
      <td>Male</td>
      <td>22</td>
      <td>Staff</td>
      <td><button type="button" class="btn btn-warning">Edit</button></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Jean Bernasor</td>
      <td>Guindulman,Bohol</td>
      <td>091204212</td>
      <td>Female</td>
      <td>19</td>
      <td>Staff</td>
      <td><button type="button" class="btn btn-warning">Edit</button></td>
    </tr>
  </tbody>
</table>
          </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Users);
