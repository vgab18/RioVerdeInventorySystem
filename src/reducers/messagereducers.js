import * as types from '../constants/MessageActionTypes.js';
import _ from 'lodash';

const initialState ={
  Message:''
}

export default function inventoryreducers(state=initialState,action={}) {
  switch (action.type) {
    case types.MESSAGE_FIELD_CHANGE:
        return _.assign({}, state,action.message)

            default:
                return state;

        }
      };
