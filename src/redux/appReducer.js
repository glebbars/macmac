import {
  REQUEST_ALL_PRODUCTS_SUCCESS,
  REQUEST_ALL_PRODUCTS_FAILURE,
  REMOVE_FROM_FAVOURITES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_BAG,
  ADD_TO_BAG,
  ADD_PRODUCTS_LIST_FILTER,
  REMOVE_PRODUCTS_LIST_FILTER,
  UPDATE_SORT_TYPE
} from "./actions/types";


export const initialStore = {
    productsArr: [],
    productsListFilters: [],
    sortType: 'popularity',
    // favorites: [],
    // addedToBag: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    addedToBag: JSON.parse(localStorage.getItem("addedToBag")) || [],
}

const appReducer = (store = initialStore, action) => {
  switch (action.type) {
    case REQUEST_ALL_PRODUCTS_SUCCESS:
      return {
        ...store,
        productsArr: action.payload,
        error: null,
      };
    case REQUEST_ALL_PRODUCTS_FAILURE:
      return {
        ...store,
        error: action.payload,
      };
    case REMOVE_FROM_FAVOURITES:
    case ADD_TO_FAVOURITES:
      return {
        ...store,
        favorites: [...action.payload],
      };
    case REMOVE_FROM_BAG:
    case ADD_TO_BAG:
      return {
        ...store,
        addedToBag: [...action.payload],
      };
    case UPDATE_SORT_TYPE:  
      return{
        ...store,
        sortType: action.payload
     }; 
    case ADD_PRODUCTS_LIST_FILTER:
    case REMOVE_PRODUCTS_LIST_FILTER:
      return {
        ...store,
        productsListFilters: [...action.payload],
      };

    default:
      return store;
  }
};

export default appReducer