import * as types from '../constants/AddNewProductActionTypes.js';
import _ from 'lodash';



const initialState ={
  edit:false,
  stockName:'',
  categoryName:'Meat',
  price:0,
  quantity:0,
  unit:'Kg',
  timeFrame:new Date(),
  totalAmount:0,
  status:true,
  category:{},
  open:false
}

export default function addproductreducers(state=initialState,action={}){
switch (action.type){

  case types.ADD_NEW_PRODUCT_OPEN_MODAL_SUCCESS:
    return _.assign({},state,{open:true})

    case types.ADD_NEW_PRODUCT_CLOSE_MODAL_SUCCESS:
      return _.assign({},state,{open:false,

        edit:false,
        stockName:'',
        categoryName:'Meat',
        price:0,
        quantity:0,
        unit:'Kg',
        timeFrame:new Date(),
        totalAmount:0,
        status:true,
        category:{}
      })

      case types.ADD_NEW_PRODUCT_FIELD_CHANGE:
        return _.assign({},state,action.addproduct)

      case types.ADD_NEWPRODUCT_SUCCESS:
          return{
            edit:false,
            stockName:'',
            categoryName:'Meat',
            price:0,
            quantity:0,
            unit:'Kg',
            timeFrame:new Date(),
            totalAmount:0,
            status:true,
            open:false
          }
      case types.ADD_NEWPRODUCT_SUCCESS_EDIT:
          return _.assign({},
          state,
          {
            edit:true,
            open:true,
            id: action.id,
          }
        )
        case types.ADD_NEW_PRODUCT_GET_DATA:
          return _.assign({},
            state,
            action.data
          )
        case types.ADD_NEWPRODUCT_SAVE_DATA:
            return{
              edit:false,
              stockName:'',
              categoryName:'Meat',
              price:0,
              quantity:0,
              unit:'Kg',
              timeFrame:new Date(),
              totalAmount:0,
              status:true,
              category:{},
              open:false
            }






    default:
    return state

    }
    }
