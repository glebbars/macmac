import { REQUEST_ALL_PRODUCTS_SUCCESS, REQUEST_ALL_PRODUCTS_FAILURE } from "./types";
import axios from "axios";

export const getAllProducts = (id) => {
  return (dispatch) => {
    axios.get("http://localhost:5000/posts",)
      .then(response => dispatch(getAllProductsSuccessCase(response.data)))
      .catch((err) => {
        dispatch(getAllProductsFailureCase(err));
      });
  };
};

const getAllProductsSuccessCase = (allProducts) => ({
  type: REQUEST_ALL_PRODUCTS_SUCCESS,
  payload: allProducts,
});

const getAllProductsFailureCase = (error) => ({
  type: REQUEST_ALL_PRODUCTS_FAILURE,
  payload: {
    ...error,
  },
});