import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import OrderForm from "../OrderForm/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import {ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES, ADD_TO_BAG, REMOVE_FROM_BAG} from '../../redux/actions/types'

const ProductsList = ({ 
  cardsArr,
  ableToBeRemoved
}) => {

  const dispatch = useDispatch()

  const favorites = useSelector((store) => store.app.favorites);
  const addedToBag = useSelector((store) => store.app.addedToBag);

  const toggleFavorites = (cardId) => {
    if (favorites.includes(cardId)) {
      dispatch({
        type: REMOVE_FROM_FAVOURITES,
        payload: favorites.filter((id) => id !== cardId),
      });
    } else {
      dispatch({
        type: ADD_TO_FAVOURITES,
        payload: [cardId, ...favorites],
      });
    }
  };


  const removeFromTheBag = (cardId) => {
    console.log('==')
    const cardIndex = addedToBag.indexOf(cardId);
    addedToBag.splice(cardIndex, 1)
    dispatch({
      type: REMOVE_FROM_BAG,
      payload: addedToBag.filter((id) => id !== cardId),
    })
  };

  const addToTheBag = (cardId) => {
    dispatch({
      type: ADD_TO_BAG,
      payload: [cardId, ...addedToBag],
    });
  };


  return (
    <div className="cards-container">
      product list
      {/* {cardsArr.map((cloth) => (
        <div className="card" key={cloth.id}>
          <Card
            toggleFavorites={toggleFavorites}
            cloth={cloth}
            filledStar={favorites.includes(cloth.id)}
            cardCross={ableToBeRemoved}
            removeFromTheBag={() => removeFromTheBag(cloth.id)}
          />
          <Button
            addToTheBag={() => addToTheBag(cloth.id)}
            text="Add to cart"
          />
        </div>
      ))} */}
    </div>
  );
};

export default ProductsList;
