import {
  REQUEST_ALL_PRODUCTS_SUCCESS,
  REQUEST_ALL_PRODUCTS_FAILURE,
  REMOVE_FROM_FAVOURITES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_BAG,
  ADD_TO_BAG,
} from "./actions/types";


const initialStore = {
  productsArr: [],
  // favorites: [],
  // addedToBag: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  addedToBag: JSON.parse(localStorage.getItem("addedToBag")) || [],
};

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
      return {
        ...store,
        favorites: [...action.payload],
      };
    case ADD_TO_FAVOURITES:
      return {
        ...store,
        favorites: [...action.payload],
      };
    case REMOVE_FROM_BAG:
      return {
        ...store,
        addedToBag: [...action.payload],
      };
    case ADD_TO_BAG:
      return {
        ...store,
        addedToBag: [...action.payload],
      };

    default:
      return store;
  }
};

export default appReducer