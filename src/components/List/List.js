import React from 'react'
import ProductCard from "../ProductCard/ProductCard";


const List = ({productsArr}) => {

  // const removeFromTheBag = (productId) => {
  //   const productIndex = addedToBag.indexOf(productId);
  //   addedToBag.splice(productIndex, 1)
  //   dispatch({
  //     type: 'REMOVE_FROM_BAG',
  //     payload: addedToBag.filter((id) => id !== productId),
  //   })
  // };

  // const addToTheBag = (productId) => {
  //   dispatch({
  //     type: 'ADD_TO_BAG',
  //     payload: [productId, ...addedToBag],
  //   });
  // };

  return (
    <>
     {productsArr.length > 0 ? 
     <div className="products__list">
       {productsArr.map(product => (
        <ProductCard
          product={product}
          key={product.id}
          />
        ))}
      </div> : 
      'К сожалению этого товара нет в данный момент'}
    </>
  ) 
}

export default List