import React from "react";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

const ProductCard = ({product}) => {
  const favorites = useSelector((store) => store.app.favorites);
  const dispatch = useDispatch()  

  const removeFromFavorites = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_FAVOURITES',
      payload: favorites.filter((id) => id !== productId),
    });
  };


  return (
    <div className="product-card__container">
      {window.location.pathname === '/favourites' && (
        <div onClick={() => removeFromFavorites(product.id)} className="product-card__cross"></div>
      )}
      <Link 
        to={`/category/${product.category.toLowerCase()}/${product.id}`} 
        className="product-card__img-container">
          <img className="product-card__img" src={product.pictures[0].url} alt="Loading..." />
      </Link>
      <span className="product-card__text">{product.category} {product.model} {product.capacity} {product.color}</span>
      <span className="product-card__price">{product.price.toLocaleString()}.00 &#x20b4;</span>
    </div>
  );
};

export default ProductCard;
