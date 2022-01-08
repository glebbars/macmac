import {
  REQUEST_CLOTHES_SUCCESS,
  REQUEST_CLOTHES_FAILURE,
  CLOSE_MODAL,
  OPEN_MODAL,
  REMOVE_FROM_FAVOURITES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_BAG,
  ADD_TO_BAG,
  SEND_CUSTOMER_DATA,
  CLEAR_CUSTOMER_BAG,
} from "./actions/types";
import { combineReducers } from "redux";

const initialStore = {
  cardsArr: [],
  openedModal: false,
  // favorites: [],
  // addedToBag: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  addedToBag: JSON.parse(localStorage.getItem("addedToBag")) || [],
  customerData: {
    name: "",
    surname: "",
    age: "",
    adress: "",
    phone: "",
    email: "",
  },
};

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case REQUEST_CLOTHES_SUCCESS:
      return {
        ...store,
        cardsArr: [...action.payload],
        error: null,
      };
    case REQUEST_CLOTHES_FAILURE:
      return {
        ...store,
        error: action.payload,
      };
    case OPEN_MODAL:
      return {
        ...store,
        openedModal: true,
      };
    case CLOSE_MODAL:
      return {
        ...store,
        openedModal: false,
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
    case SEND_CUSTOMER_DATA:
      return {
        ...store,
        customerData: action.payload,
      };
    case CLEAR_CUSTOMER_BAG:
      return {
        ...store,
        addedToBag: [...action.payload],
      };

    default:
      return store;
  }
};

const reducers = combineReducers({
  app: reducer,
});

export default reducer;
