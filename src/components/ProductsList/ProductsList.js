import React from "react";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import {ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES, ADD_TO_BAG, REMOVE_FROM_BAG} from '../../redux/actions/types'
import {categoryProductsOptions, modelIphoneOptions} from '../additionalObjects/additionalObjects'
const ProductsList = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((store) => store.app.favorites);
  const addedToBag = useSelector((store) => store.app.addedToBag);
  const productsArr = useSelector((store) => store.app.productsArr);
  const productsListFilters = useSelector((store) => store.app.productsListFilters);

  const toggleFavorites = (productId) => {
    if (favorites.includes(productId)) {
      dispatch({
        type: 'REMOVE_FROM_FAVOURITES',
        payload: favorites.filter((id) => id !== productId),
      });
    } else {
      dispatch({
        type: 'ADD_TO_FAVOURITES',
        payload: [productId, ...favorites],
      });
    }
  };


  const removeFromTheBag = (productId) => {
    const productIndex = addedToBag.indexOf(productId);
    addedToBag.splice(productIndex, 1)
    dispatch({
      type: 'REMOVE_FROM_BAG',
      payload: addedToBag.filter((id) => id !== productId),
    })
  };

  const addToTheBag = (productId) => {
    dispatch({
      type: 'ADD_TO_BAG',
      payload: [productId, ...addedToBag],
    });
  };


  const filteredProductsArr = productsArr.filter(product => {
    const fullProductName = `${product.category} ${product.model} ${product.capacity} ${product.color}`
    if(productsListFilters.length > 0){
      return productsListFilters.some(filter => fullProductName.includes(filter))
    } else{
      return product
    }
  })

  console.log(filteredProductsArr)


  return (
    <div className="products__list">
      {filteredProductsArr.map(product => (
        <Product
          key={product.id}
          toggleFavorites={toggleFavorites}
          product={product}
          filledStar={favorites.includes(product.id)}
          //  productCross={ableToBeRemoved}
          removeFromTheBag={() => removeFromTheBag(product.id)}
          addToTheBag={() => addToTheBag(product.id)}
        />
      ))}    
    </div>
  );
};

export default ProductsList;