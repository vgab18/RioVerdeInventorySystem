import * as types from '../constants/InventoryActionTypes.js';
import _ from 'lodash';

const initialState = {
    openStockIn:false,
    openStockOut:false,
    data:[]
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

        case types.SET_DEFAULT_PRODUCT:
            return _.assign({},
                state,
                action.inventory
                )

        case types.ADD_MORE_ROWS_SUCCESS:
            return _.assign({},
                state,
                action.inventory
                )

        case types.DELETE_ROWS_SUCCESS:
            return _.assign({},
                state,
                action.inventory
                )

        case types:SELECT_PRODUCT_FIELD_CHANGE:
            return _.assign({},
                state,
                action.inventory,
            )
    
        default:
        return state
    }
}