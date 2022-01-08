import { REQUEST_CLOTHES_FAILURE, REQUEST_CLOTHES_SUCCESS } from "./types";

import axios from "axios";

export const getClothes = () => {
  return (dispatch) => {
    axios
      .get("/clothesArr.json")
      .then((response) => {
        dispatch(getClothesSuccessCase(response.data));
      })
      .catch((err) => {
        dispatch(getFilmsFailureCase(err));
      });
  };
};

const getClothesSuccessCase = (cardsArr) => ({
  type: REQUEST_CLOTHES_SUCCESS,
  payload: cardsArr,
});

const getFilmsFailureCase = (error) => ({
  type: REQUEST_CLOTHES_FAILURE,
  payload: {
    ...error,
  },
});
