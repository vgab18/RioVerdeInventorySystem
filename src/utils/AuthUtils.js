import React from 'react';
import {connect} from 'react-redux';
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/authactions';
import _ from 'lodash';


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

export function requireAuthentication(Component,roles) {

    var rolesArray = [];
    if(typeof roles === 'string'){
        rolesArray.push(roles);
    }

    if(roles instanceof Array){
        rolesArray = roles;
    }


    class AuthenticatedComponent extends React.Component{

        constructor(props){
            super(props);
        }


        state = {
            allowRender: false
        };


        authenticate= ()=>{




            let newProps = this.props;

            var {dispatch} = newProps;
            var targetPath=newProps.location.pathname + newProps.location.search;

            var token = localStorage.login;

            if(token){
                // try checking account if already existed
                if(!newProps.auth.account){
                    // attempt to get account details based on existing session cookie and csrf
                    dispatch(AuthActions.loginSuccess(targetPath,true));
                }

                //if(!newProps.auth.fromStart)
                //always check checkRoles
                this.checkRoles(newProps.auth.account);
            }
            else {

                if(!newProps.auth.fromStart)
                    if(targetPath)
                    // dispatch(routerActions.push("/login?targetPath="+targetPath));
                        dispatch(AuthActions.logout(targetPath));
                    else
                    // dispatch(routerActions.push("/login"));
                        dispatch(AuthActions.logout());
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

            var renderMe=null;

            if( this.props.auth &&
                this.props.auth.account &&
                this.props.auth.isAuthenticated)
                renderMe=(<Component {...this.props}/>);


            setTimeout(()=>{
                this.authenticate();
            },200);


            return (
                <div>
                    {renderMe}
                </div>
            );
        }
    }




    const mapStateToProps = (state) => ({
        auth: state.auth
        /*,location: state.routing.location*/
    });





    return connect(mapStateToProps)(AuthenticatedComponent);


}
