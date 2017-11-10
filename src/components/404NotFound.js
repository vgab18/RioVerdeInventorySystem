import React from "react";
import {Grid, Well} from "react-bootstrap";
import {routerActions} from "react-router-redux";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authactions from "../actions/authactions";


class  NotFound extends React.Component{



     goBack = ()=>{

        this.props.routerActions.goBack();
     };



    render(){

        return (
            <Grid id="access-denied">
                <Well style={{backgroundColor:'#89c0c7'}}>
                    <h1>404: Not Found</h1>
                </Well>
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
