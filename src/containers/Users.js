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
import Navlayout from './Navlayout';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';




class Users extends Component {
  constructor(props){
    super(props);
    this.state ={
      open:false
    }
  }
  handleOpen = () => {
   this.setState({open: true});
 };

 handleClose = () => {
   this.setState({open: false});
 };
  render() {
    const paperstyle=
    {
      height: 'auto',
      width: 'auto',
      margin: 50,
      padding: 20,
      overflowX: 'auto'
    };
    const actions = [
      <button type="button" class="btn btn-info" style={{marginRight:10,width:'150px'}}>Save</button>,
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose} style={{marginRight:10}}>Close</button>,
    ];
    const modalscroll={
      overflow: 'auto',
      height: '90%'
    }
    return (
      <div>
      <Navlayout open={this.handleOpen}/>
          <Dialog
            title="+Add New User"
            actions={actions}
            modal={false}
	          autoScrollBodyContent={true}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            <Grid>
            <Col sm={9}style={{marginLeft:'14%'}}>
              <form>
                <fieldset>
                  <div class="form-group">
                  <label for="exampleInputEmail1">User Role</label>
                    <select multiple="" class="form-control" id="exampleSelect2">
                      <option>Staff</option>
                      <option>Admin</option>
                      <option>Kitchen</option>
                    </select>
                  </div>
                  <div class="form-group">
                  <label for="exampleInputEmail1">First Name</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <div class="form-group">
                  <label for="exampleInputEmail1">Last Name</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <div class="form-group">
                  <label for="exampleInputEmail1">Address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <div class="form-group">
                  <label for="exampleInputEmail1">Contact No.</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <Row>
                  <label for="exampleInputEmail1">
                  <Col md={4}>
                    Gender
                    </Col>
                  </label>
                  <fieldset class="form-group">
                      <div class="form-group">
                        <div class="form-check">
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked="true"/>
                            <Col md={4}>
                            Male
                            </Col>
                        </label>
                      </div>
                        <div class="form-check">
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked="true"/>
                            <Col md={4}>
                            Female
                            </Col>
                          </label>
                          </div>
                      </div>
                    </fieldset>
                    </Row>
                  <div class="form-group">
                  <label for="exampleInputEmail1">Username</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <div class="form-group">
                  <label for="exampleInputEmail1">Password</label>
                  <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <div class="form-group">
                  <label for="exampleInputEmail1">Confirm Password</label>
                  <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                </fieldset>
              </form>
              </Col>
              </Grid>
          </Dialog>
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
      <th>Age</th>
      <th>Role</th>
      <th>Status</th>
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
      <td>Active</td>
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
      <td>Active</td>
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
      <td>Inactive</td>
      <td><button type="button" class="btn btn-warning">Edit</button></td>
    </tr>
    <tr>
      <td>4</td>
      <td>Jean Bernasor</td>
      <td>Guindulman,Bohol</td>
      <td>091204212</td>
      <td>Female</td>
      <td>19</td>
      <td>Staff</td>
      <td>Inactive</td>
      <td><button type="button" class="btn btn-warning">Edit</button></td>
    </tr>
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
  }
}

function mapDispatchToProps(dispatch) {
  return{
    routerActions: bindActionCreators(routerActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);
