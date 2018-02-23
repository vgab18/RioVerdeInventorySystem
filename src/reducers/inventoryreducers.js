import * as types from '../constants/InventoryActionTypes.js';
import _ from 'lodash';

const initialState = {
    openStockIn:false,
    openStockOut:false
}

export default function inventoryreducers(state=initialState,action={}) {
    switch (action.type) {
        case types.OPEN_STOCK_IN_MODAL_SUCCESS:
          return _.assign({},
            state,{
            openStockIn:true
            }
        )

        case types.CLOSE_STOCK_IN_MODAL_SUCCESS:
          return _.assign({},
            state,{
            openStockIn:false
            }
        )
    
        default:
        return state
    }
}