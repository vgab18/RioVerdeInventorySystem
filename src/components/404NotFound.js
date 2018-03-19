import React from "react";
import {Grid, Well} from "react-bootstrap";
import {routerActions} from "react-router-redux";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authactions from "../actions/authactions";
import notfound from '../Style/images/notfound.jpg';
import {Paper} from 'material-ui';

class  NotFound extends React.Component{



     goBack = ()=>{

        this.props.routerActions.goBack();
     };



    render(){

        const paperstyle=
        {
          height: 'auto',
          width: 'auto',
          margin:50,
          marginTop:100,
          padding: 20,
          overflowX: 'auto',
          textAlign:'center'
              };

        return (
          <Grid id="not-found">
                <Paper style={paperstyle}>
                  <h1 style={{color:'grey'}}>Oops!</h1>
                  <h5><img src={notfound}/></h5>
                  <h5 style={{color:'grey'}}>Page not found</h5>
                  <p><h6 style={{color:'gray'}}>The Page you are looking for doesn't exist or an other error</h6>
                  <h6 style={{color:'gray'}}>occured Go back, or head over to Home to choose new direction</h6></p>
                  <button type="button" class="btn btn-primary" onClick={this.goBack}>Go Back</button>
              </Paper>
          </Grid>);
  }
}



function mapStateToProps(state) {
    return {

    }
}


function mapDispatchToProps(dispatch) {
    return {
        routerActions:bindActionCreators(routerActions, dispatch),
        authactions:bindActionCreators(authactions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NotFound);
