import React, {Component} from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authactions'
import _ from 'lodash'


export function isInRole(role,rolesRepo){
  return _.includes(rolesRepo || [], role);
}


export function isInAnyRole(roles,rolesRepo){

  roles = _.isArray(roles) ? roles : [];
  var found = false;
  roles.forEach(function(i){

      if(isInRole(i,rolesRepo))
      {
          found = true;
      }

  });


  return found;
}

export let requireAuthentication = (roles,PassedComponent) => {

  var rolesArray = [];
  if(typeof roles === 'string'){
      rolesArray.push(roles);
  }

  if(roles instanceof Array){
      rolesArray = roles;
  }


  class RenderComponent extends Component {

    componentWillMount(){

      
    }

    state = {
      allowRender: false
  };

  authenticate= ()=>{

      let newProps = this.props;

      const {dispatch} = this.props
      const token = localStorage.login;
      const target = this.props.location.pathname+this.props.location.search;
        if (token) {
          if (!this.props.auth.account) {
            dispatch(authActions.loginSuccess(target))
            // dispatch(routerActions.push('/login?target='+this.props.router.location.pathname))
          }
        }else {
          if (!this.props.auth.loggingIn) {
            if(target)
              // dispatch(routerActions.push("/login?targetPath="+targetPath));
                  dispatch(authActions.logout(target));
              else
              // dispatch(routerActions.push("/login"));
                  dispatch(authActions.logout());
          }
          else {
              this.checkRoles(newProps.auth.account);
          }
        }

  };


  componentWillReceiveProps(nextProps){
      // console.log(nextProps);
      //this.checkRoles(nextProps.auth.account);
  }
  componentWillUpdate(nextProps){
      // console.log('componentWillUpdate');
      // this.checkRoles(nextProps.auth.account);
  }

    checkRoles=(account)=>{

      var {dispatch} = this.props;
      var targetPath=this.props.location.pathname+this.props.location.search;

      // console.log('checking otp user');
      // console.log(account.otpUser);

      if(account){

          var roles = account.roles;


          if (roles == null || roles.length == 0) {
              dispatch(routerActions.push("/accessdenied"));
              return;
          }



          if (rolesArray.length > 0) {
              if (rolesArray.length == 1) {
                  if (!isInRole(rolesArray[0], roles)){
                      setTimeout(()=>{
                          dispatch(routerActions.push("/accessdenied"));
                      },100);

                  }
              }
              else {
                  if (!isInAnyRole(rolesArray, roles)){
                      setTimeout(()=>{
                          dispatch(routerActions.push("/accessdenied"));
                      },100);

                  }
              }
          }

      }
  };

    render(){

      setTimeout(()=>{
        this.authenticate();
      },200);
      return (
        <PassedComponent {...this.props}/>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth,
      router: state.router,
    }
  }

  return connect(mapStateToProps)(RenderComponent)
}
