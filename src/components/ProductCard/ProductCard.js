import React from "react";
import {Link} from 'react-router-dom'

const ProductCard = ({product}) => {

  return (
    <div className="product-card__container">
      <Link 
        to={`${product.category.toLowerCase()}/${product.id}`} 
        className="product-card__img-container">
          <img className="product-card__img" src={product.pictures[0].url} alt="Loading..." />
      </Link>
      <span className="product-card__text">{product.category} {product.model} {product.color} {product.capacity}</span>
      <span className="product-card__price">{product.price.toLocaleString()}.00 &#x20b4;</span>
    </div>
  );
};

export default ProductCard;
