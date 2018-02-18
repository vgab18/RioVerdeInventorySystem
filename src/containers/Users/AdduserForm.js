import React from 'react';
import {Grid,
        Col,Row} from 'react-bootstrap';
import validation from 'react-validation-mixin';
import RaisedButton from 'material-ui/RaisedButton';
import strategy from 'react-validatorjs-strategy';
import validatorjs from 'validatorjs';
import  classnames from 'classnames';


class AdduserForm extends React.Component {

  constructor(props) {
    super(props);


    this.validatorTypes=strategy.createSchema(
      {
        firstName: 'required',
        lastName: 'required',
        address: 'required',
        contactNo: 'required',
        gender: 'required',
        userName: 'required',
        password: 'required',
        confirmpassword: 'required|same:password',
        role: 'required'
      },
      {
        "required": "The field :attribute is required!",
        "confirmpassword": "Please confirm your password"
      },
      function (validator){
        validator.setAttributesNames({
          firstName: 'First Name',
          lastName: 'Last Name',
          address: 'Address',
          contactNo: 'Contact Number',
          gender: 'Gender',
          userName: 'Username',
          password: 'Password',
          confirmpassword: 'Confirm Password'
        });
      }
    );
  }

    getValidatorData = () => {
      return this.props.addUser
    };

    getClasses = (field) => {
      return classnames({
        'success': this.props.isValid(field),
        'error': this.props.isValid(field)
      });

    }

  onFormSubmit = (event) => {
    event.preventDefault();

      this.props.validate(this.onValidate);
  };

  getErrorField = (field) => {
    var error   = this.props.errors[fields];
    if(!error)
      return null;
    if(Array.isArray(error)){
      var message = [];
      message = error.map((item,i) =>{
        return (
          <span key={i}>
            {item}
            <br />
          </span>
        )
      });
      return message;
    }
    else
      return (<span>{error || ''}</span>);
  };

  onValidate = (error) => {
    if(error){
      event.preventDeafult();
    }
    else{
      this.saveRecord()
    }
  };



  render(){
    return(
      <form>
        <fieldset>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
            <FormControl onChange={this.props.handleselectChange()} componentClass="select"
            placeholder="select"
            onBlur={()=>{
              this.props.validate('event');
            }}>
                  <option value="staff">Staff</option>
                  <option value="kitchen">Kitchen</option>
            </FormControl>
        </FormGroup>
          <div class="form-group">
          <label for="exampleInputEmail1">First Name</label>
          <input name="firstName" onChange={this.props.handleChange()} value={this.props.adduser.firstName} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div class="form-group">
          <label for="exampleInputEmail1">Last Name</label>
          <input name="lastName" onChange={this.props.handleChange()} value={this.props.adduser.lastName} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div class="form-group">
          <label for="exampleInputEmail1">Address</label>
          <input name="address" onChange={this.props.handleChange()} value={this.props.adduser.address} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div class="form-group">
          <label for="exampleInputEmail1">Contact No.</label>
          <input name="contactNo" onChange={this.props.handleChange()} value={this.props.adduser.contactNo} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <Row>
          <label for="exampleInputEmail1">
          <Col md={4}>
            Gender
            </Col>
          </label>
          <RadioButtonGroup
              name="gender"
              defaultSelected="Male"
              valueSelected={this.props.adduser.gender}
              onChange={this.props.handleChange()}>

              <RadioButton
              value="Male"
              label="Male"/>

              <RadioButton
              value="Female"
              label="Female"/>

          </RadioButtonGroup>
            </Row>
          <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input name="userName" onChange={this.props.handleChange()} value={this.props.adduser.userName} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div class="form-group">
          <label for="exampleInputEmail1">Password</label>
          <input name="password" onChange={this.props.handleChange()} value={this.props.adduser.password} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div class="form-group">
          <label for="exampleInputEmail1">Confirm Password</label>
          <input name="seepassword" onChange={this.props.handleChange()} value={this.props.adduser.seepassword} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
        </fieldset>
      </form>



    )
  }
  }

    export default validation(strategy)(AddUserForm);
