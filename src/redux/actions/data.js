import { REQUEST_ALL_PRODUCTS_SUCCESS, REQUEST_ALL_PRODUCTS_FAILURE } from "./types";
import axios from "axios";

export const getAllProducts = () => {
  return (dispatch) => {
    // axios.get("https://mac-mac.herokuapp.com/api/posts")
    axios.get(`${process.env.REACT_APP_DB_API}/posts`)
      .then(response => dispatch(getAllProductsSuccessCase(response.data)))
      .catch((err) => {
        dispatch(getAllProductsFailureCase(err));
      });
  };
};

const getAllProductsSuccessCase = (allProducts) => ({
  type: 'REQUEST_ALL_PRODUCTS_SUCCESS',
  payload: allProducts,
});

const getAllProductsFailureCase = (error) => ({
  type: 'REQUEST_ALL_PRODUCTS_FAILURE',
  payload: {
    ...error,
  },
});