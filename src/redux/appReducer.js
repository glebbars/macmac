import {
  REQUEST_ALL_PRODUCTS_SUCCESS,
  REQUEST_ALL_PRODUCTS_FAILURE,
  REMOVE_FROM_FAVOURITES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_BAG,
  ADD_TO_BAG,
  ADD_PRODUCTS_LIST_FILTER,
  REMOVE_PRODUCTS_LIST_FILTER,
  UPDATE_SORT_TYPE,
  UPDATE_PAGE_SIZE,
  UPDATE_SORTED_PRODUCTS_LENGTH,
  UPDATE_PAGE_NUM,
  ADD_RECENTLY_VIEWED,
  ADD_PERCENT_TO_PRICE
} from "./actions/types";


export const initialStore = {
  sortType: 'novelty',
  pageSize: 24,
  sortedProductsLength: 0,
  productsListFilters: [],
  pageNum: 1,
  productsArr: [],
  recentlyViewed: JSON.parse(localStorage.getItem("macmac-recentlyViewed")) || [],
  favorites: JSON.parse(localStorage.getItem("macmac-favorites")) || [],
  addedToBag: JSON.parse(localStorage.getItem("macmac-addedToBag")) || [],
  percentToAdd: 0
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
    case UPDATE_PAGE_SIZE:
      return{
        ...store,
        pageSize: action.payload
      } 
    case UPDATE_SORTED_PRODUCTS_LENGTH:
      return{
        ...store,
        sortedProductsLength: action.payload
      }
    case UPDATE_PAGE_NUM: 
      return{
        ...store,
        pageNum: action.payload
      }  
    case ADD_PRODUCTS_LIST_FILTER:
    case REMOVE_PRODUCTS_LIST_FILTER:
      return {
        ...store,
        productsListFilters: [...action.payload],
      }; 
    case ADD_RECENTLY_VIEWED: 
      return  {
        ...store,
        recentlyViewed: [...action.payload]
      };
    case ADD_PERCENT_TO_PRICE:
      return{
        ...store,
        percentToAdd: action.payload
      }  
    default:
      return store;
  }
};

export default appReducer