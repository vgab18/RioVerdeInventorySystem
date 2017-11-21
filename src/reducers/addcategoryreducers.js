import * as types from '../constants/AddCategoryActionTypes.js';
import _ from 'lodash';


const initialState ={
  edit:false,
  categoryName:'',
  open:false
}


export default function addcategoryreducers(state=initialState,action={}){
switch (action.type) {
  case types.ADDCATEGORY_OPEN_MODAL_SUCCESS:
    return _.assign({},state,{open:true})

    case types.ADDCATEGORY_CLOSE_MODAL_SUCCESS:
      return _.assign({},state,{open:false,

        edit:false,
        categoryName:'',
        open:false})

    case types.ADD_CATEGORY_FIELD_CHANGE:
      return _.assign({},state,action.addcategory)

    case types.ADD_CATEGORY_SUCCESS:
      return{
            edit:false,
            categoryName:'',
            status:true,
            open: false
      }

      case types.ADD_CATEGORY_EDIT:
        return _.assign({},
        state,
        {
          edit:true,
          open:true,
          id: action.id,
        }
      )
      case types.ADD_CATEGORY_GET_DATA:
        return _.assign({},
          state,
          action.data
        )

        case types.ADD_CATEGORY_SAVE_DATA:
          return{
            edit:false,
            categoryName:'',
            status:true,
            open: false
          }





      default:
      return state
}
}
