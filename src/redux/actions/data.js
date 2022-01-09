import { REQUEST_PRODUCT_BY_ID_FAILURE, REQUEST_PRODUCT_BY_ID_SUCCESS, REQUEST_ALL_PRODUCTS_SUCCESS, REQUEST_ALL_PRODUCTS_FAILURE } from "./types";

import axios from "axios";

export const getProduct = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:5000/posts/${id}`)
      .then((response) => {
        dispatch(getProductSuccessCase(response.data));
      })
      .catch((err) => {
        dispatch(getProductFailureCase(err));
      });
  };
};

const getProductSuccessCase = (product) => ({
  type: REQUEST_PRODUCT_BY_ID_SUCCESS,
  payload: product,
});

const getProductFailureCase = (error) => ({
  type: REQUEST_PRODUCT_BY_ID_FAILURE,
  payload: {
    ...error,
  },
});

export const getAllProducts = (id) => {
  return (dispatch) => {
    axios.get('http://localhost:5000/posts')
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