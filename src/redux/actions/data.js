import {
  REQUEST_ALL_PRODUCTS_SUCCESS,
  REQUEST_ALL_PRODUCTS_FAILURE,
} from "./types";
import axios from "axios";

export const getAllProducts = () => {
  return (dispatch) => {
    // axios.get("https://mac-mac.herokuapp.com/api/posts")
    axios
      .get(`${process.env.REACT_APP_DB_API}/posts`)
      // .then((response) => checkIds(response.data, true))
      .then((response) => dispatch(getAllProductsSuccessCase(response.data)))
      .catch((err) => {
        dispatch(getAllProductsFailureCase(err));
      });
  };
};

const checkIds = (allProducts, sendReq) => {
  const fixedIdsArr = allProducts.map((product, index) => ({
    ...product,
    id: index + 1,
  }));

  if (sendReq) {
    axios
      .post("http://localhost:5000/posts", fixedIdsArr)
      .then((res) => console.log(res));

    return allProducts;
  } else {
    return allProducts;
  }
};

const getAllProductsSuccessCase = (allProducts) => {
  return {
    type: REQUEST_ALL_PRODUCTS_SUCCESS,
    payload: allProducts,
  };
};

const getAllProductsFailureCase = (error) => ({
  type: REQUEST_ALL_PRODUCTS_FAILURE,
  payload: {
    ...error,
  },
});
