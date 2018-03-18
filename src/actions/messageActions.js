import * as types from '../constants/MessageActionTypes';
import axios from 'axios';
import { routerActions } from 'react-router-redux'


export let handleChangeMessage = (name,value) => {
  return (dispatcher,getState) => {
    var { message } = getState();


  message[name] = value;

  dispatcher({
    type: types.MESSAGE_FIELD_CHANGE,
    message
  })

  }
}
