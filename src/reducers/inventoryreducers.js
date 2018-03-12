import * as types from '../constants/InventoryActionTypes.js';
import _ from 'lodash';
import update from 'react-addons-update'

const initialState = {
    openStockIn:false,
    openStockOut:false,
    selectedSupplier: 1,
    selectedProduct: 0,
    price: 0,
    quantity: 0,
    inventorydata:[]
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

        case types.ADD_MORE_ROWS_SUCCESS:
            return _.assign({},
            state,action.inventory
                )

        case types.DELETE_ROWS_SUCCESS:
            return _.assign({},
                state,
                action.inventory
                )

        case types.SELECT_SUPPLIER_FIELD_CHANGE:
            return Object.assign({}, state, action.inventory)

        case types.SELECT_PRODUCT_FIELD_CHANGE:
            return _.assign({},
                state,
                action.inventory)
                
        case types.ADD_ITEM_PRICE_FIELD_CHANGE:
            return _.assign({},
                state,
                {
                    price: action.value
                })

        case types.ADD_ITEM_QUANTITY_FIELD_CHANGE:
        return _.assign({},
            state,
            {
                quantity: action.value
            }
        )

        case types.SAVE_ALL_ROWS_DATA_SUCCESS:
            return _.assign({},
                state,
                {
                    openStockIn:false,
                    selectedSupplier: 1,
                    selectedProduct: 0,
                    price: 0,
                    quantity: 0,
                    inventorydata:[]
                }
            )
    
        default:
        return state
    }
}