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
    actionType:'',
    inventorydata:[],
    inventory:[],
    producthistory:[],
    transactionhistory:[]
}

export default function inventoryreducers(state=initialState,action={}) {
    switch (action.type) {
        case types.OPEN_STOCK_IN_MODAL_SUCCESS:
          return _.assign({},
            state,{
            openStockIn:true,
            actionType:'IN'
            }
        )

        case types.CLOSE_STOCK_IN_MODAL_SUCCESS:
          return _.assign({},
            state,{
            openStockIn:false,
            actionType:'',
            selectedSupplier: 1,
            selectedProduct: 0,
            price: 0,
            quantity: 0,
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
                }
            )

        case types.GET_INVENTORY_DATA_SUCCESS:
        return _.assign({},
                state,
                    {
                    inventory: action.data
                    }
                )

        case types.GET_PRODUCTHISTORY_DATA_SUCCESS:
        return _.assign({},
                state,{
                    producthistory: action.data
                })

        case types.GET_TRANSACTIONHISTORY_DATA_SUCCESS:
        return _.assign({},
                state,{
                    transactionhistory: action.data
                })

        case types.OPEN_STOCK_OUT_MODAL_SUCCESS:
        return _.assign({},
                state,{
                openStockOut:true,
                actionType:'OUT'
                })

        case types.CLOSE_STOCK_OUT_MODAL_SUCCESS:
        return _.assign({},
                state,{
                openStockOut:false,
                })

        case types.SAVE_STOCK_OUT_SUCCESS:
        return _.assign({},
                state,{
                    openStockOut:false,
                    selectedSupplier: 1,
                    selectedProduct: 0,
                    price: 0,
                    quantity: 0,
                    actionType:''
                })
        default:
        return state
    }
}
