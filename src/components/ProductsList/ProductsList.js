import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES, ADD_TO_BAG, REMOVE_FROM_BAG} from '../../redux/actions/types'
import {useLocation} from 'react-router-dom'
import ProductsSideBar from "../ProductsSideBar/ProductsSideBar";
import {routesNames, bgImgObj} from '../additionalObjects/additionalObjects'

const ProductsList = ({ 
  ableToBeRemoved
}) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const cardsArr = useSelector((store) => store.app.cardsArr);
  const favorites = useSelector((store) => store.app.favorites);
  const addedToBag = useSelector((store) => store.app.addedToBag);
  const [styledBgObj, setStyledBgObj] = useState({})

  useEffect(() => {
   const randomIndex = Math.floor(Math.random() * 3);
   const stylesObj = {
     backgroundColor: bgImgObj[randomIndex].bgColor,
     backgroundImage: `url(${(bgImgObj[randomIndex].lineImg)})`,
   }

   setStyledBgObj(stylesObj)
  }, [location])

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
    <div className="products">
      <div style={styledBgObj} className="products__background">
       <h1 className="products__header">{routesNames[location.pathname.split('/category/')[1]]}</h1>
      </div>
      <div className="products__section">

        <ProductsSideBar />

        <div className="products__list">
          {cardsArr.map(product => (
              <Card
                key={product.id}
                toggleFavorites={toggleFavorites}
                product={product}
                filledStar={favorites.includes(product.id)}
                cardCross={ableToBeRemoved}
                removeFromTheBag={() => removeFromTheBag(product.id)}
                addToTheBag={() => addToTheBag(product.id)}
              />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductsList;