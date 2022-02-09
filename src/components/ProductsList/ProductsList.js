import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import OrderForm from "../OrderForm/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import {ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES, ADD_TO_BAG, REMOVE_FROM_BAG} from '../../redux/actions/types'
import lightpurpleLine from '../../img/lightpurple-line.svg'
import orangeLine from '../../img/orange-line.svg'
import greenLine from '../../img/green-line.svg'
import blueLine from '../../img/blue-line.svg'
import {useLocation} from 'react-router-dom'
import CategoryDropDown from '../CategoryDropDown/CategoryDropDown'

const bgImgObj = [
  {
    lineImg: lightpurpleLine,
    bgColor: '#f2e0f5'
  },
  // {
  //   lineImg: orangeLine,
  //   bgColor: '#F8E5D6'
  // },
  {
    lineImg: greenLine,
    bgColor: '#DBECCE'
  },
  {
    lineImg: blueLine,
    bgColor: '#E2F1F4'
  },
]

const routesNames = {
  "all-products": "Все товары",
  "iphone": 'iPhone',
  "imac": 'iMac',
  "airpods": 'AirPods',
  "ipad": 'iPad',
  "macbook": 'Macbook',
  "watch": 'Apple Watch',
  "accessories": 'Аксессуары',
  "apple-tv": 'Apple TV',
  "sony-tv": 'Sony TV',
}

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
        <div className="products__filters-section">
          <h1 className="products__filters-section__header">{location.pathname.split('/category/')[1] === 'all-products' ? 'Категория' : 'Фильтры'}</h1>
          <h4 className="products__filters-section__subheader">{routesNames[location.pathname.split('/category/')[1]]}</h4>
          {/* <CategoryDropDown brand='Apple' options={['iPhone', 'Mac', 'iPad', 'AirPods', 'Watch']}/> */}
        </div>
        <div className="products__list">
          {cardsArr.map(product => (
            // <div className="card" key={product.id}>
              <Card
               key={product.id}
                toggleFavorites={toggleFavorites}
                product={product}
                filledStar={favorites.includes(product.id)}
                cardCross={ableToBeRemoved}
                removeFromTheBag={() => removeFromTheBag(product.id)}
              />
            // </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductsList;
