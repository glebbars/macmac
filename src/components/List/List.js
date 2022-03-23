import react from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";


const List = ({productsArr}) => {
  const dispatch = useDispatch()

  const favorites = useSelector((store) => store.app.favorites);
  const addedToBag = useSelector((store) => store.app.addedToBag);

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

  return (
    <>
     {productsArr.length > 0 ? 
     <div className="products__list">
       {productsArr.map(product => (
        <ProductCard
          key={product.id}
          toggleFavorites={toggleFavorites}
          product={product}
          filledStar={favorites.includes(product.id)}
          //  productCross={ableToBeRemoved}
          removeFromTheBag={() => removeFromTheBag(product.id)}
          addToTheBag={() => addToTheBag(product.id)}
          />
        ))}
      </div> : 
      'К сожалению этого товара нет в данный момент'}
    </>
  ) 
}

export default List