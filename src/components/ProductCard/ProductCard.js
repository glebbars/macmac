import React from "react";
import {Link} from 'react-router-dom'
// import Star from "../Star/Star";

const ProductCard = ({
  product,
  toggleFavorites,
  filledStar,
  productCross,
  removeFromTheBag
}) => {

  return (
      <Link to={`${product.category.toLowerCase()}/${product.id}`} className="product-card__container">
        {/* {product && ( */}
        <div className="product-card__img-container">
          <img className="product-card__img" src={product.pictures[0].url} alt="Loading..." />
        </div>
        <span className="product-card__text">{product.category} {product.model} {product.color} {product.capacity}</span>
        <span className="product-card__price">{product.price.toLocaleString()}.00 &#x20b4;</span>

          {/* <Star
            product={product}
            toggleFavorites={toggleFavorites}
            filledStar={filledStar}
          />
          {productCross && <div onClick={removeFromTheBag} className="product__cross"></div>} */}
        {/* )} */}
    </Link>
  );
};

export default ProductCard;
