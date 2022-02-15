import React from "react";
// import Star from "../Star/Star";

const Card = ({
  product,
  toggleFavorites,
  filledStar,
  cardCross,
  removeFromTheBag
}) => {
  return (
      <div className="card__container">
        {/* {product && ( */}
        <div className="card__img-container">
          <img className="card__img" src={product.pictures[0].url} alt="Loading..." />
        </div>
        <span className="card__text">{product.category} {product.model} {product.color} {product.capacity}</span>
        <span className="card__price">{product.price.toLocaleString()}.00 &#x20b4;</span>

          {/* <Star
            product={product}
            toggleFavorites={toggleFavorites}
            filledStar={filledStar}
          />
          {cardCross && <div onClick={removeFromTheBag} className="card__cross"></div>} */}
        {/* )} */}
    </div>
  );
};

export default Card;
