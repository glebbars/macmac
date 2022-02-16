import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
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
  const productsArr = useSelector((store) => store.app.productsArr);
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

  const toggleFavorites = (productId) => {
    if (favorites.includes(productId)) {
      dispatch({
        type: REMOVE_FROM_FAVOURITES,
        payload: favorites.filter((id) => id !== productId),
      });
    } else {
      dispatch({
        type: ADD_TO_FAVOURITES,
        payload: [productId, ...favorites],
      });
    }
  };


  const removeFromTheBag = (productId) => {
    const productIndex = addedToBag.indexOf(productId);
    addedToBag.splice(productIndex, 1)
    dispatch({
      type: REMOVE_FROM_BAG,
      payload: addedToBag.filter((id) => id !== productId),
    })
  };

  const addToTheBag = (productId) => {
    dispatch({
      type: ADD_TO_BAG,
      payload: [productId, ...addedToBag],
    });
  };

  const filteredProductsArrArr = filterText => {
    const filArr = productsArr.filter(product => {
      const productFullName = `${product.category} ${product.model} ${product.color} ${product.capacity}`
      console.log(productFullName,'--', filterText, '--', productFullName.includes(filterText))
    })
    console.log(filArr)
  }


  return (
    <div className="products">
      <div style={styledBgObj} className="products__background">
       <h1 className="products__header">{routesNames[location.pathname.split('/category/')[1]]}</h1>
      </div>
      <div className="products__section">

        <ProductsSideBar addFilter={filteredProductsArrArr}/>

        <div className="products__list">
          {productsArr.map(product => (
              <Product
                key={product.id}
                toggleFavorites={toggleFavorites}
                product={product}
                filledStar={favorites.includes(product.id)}
                productCross={ableToBeRemoved}
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