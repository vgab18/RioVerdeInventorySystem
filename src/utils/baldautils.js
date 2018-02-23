import React, {Component} from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authactions'

export let RequireAuthentication = (PassedComponent) => {


  class RenderComponent extends Component {

    componentWillMount(){

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
            dispatch(routerActions.push('/login?target=/dashboard'))
          }
        }
    }

    render(){
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
