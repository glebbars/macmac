import React from "react";
// import Star from "../Star/Star";

const Product = ({
  product,
  toggleFavorites,
  filledStar,
  productCross,
  removeFromTheBag
}) => {
  return (
      <div className="product__container">
        {/* {product && ( */}
        <div className="product__img-container">
          <img className="product__img" src={product.pictures[0].url} alt="Loading..." />
        </div>
        <span className="product__text">{product.category} {product.model} {product.color} {product.capacity}</span>
        <span className="product__price">{product.price.toLocaleString()}.00 &#x20b4;</span>

          {/* <Star
            product={product}
            toggleFavorites={toggleFavorites}
            filledStar={filledStar}
          />
          {productCross && <div onClick={removeFromTheBag} className="product__cross"></div>} */}
        {/* )} */}
    </div>
  );
};

export default Product;
