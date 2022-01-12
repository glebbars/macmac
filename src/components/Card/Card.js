import React from "react";
import PropTypes from "prop-types";
import Star from "../Star/Star";

const Card = ({
  cloth,
  toggleFavorites,
  filledStar,
  cardCross,
  removeFromTheBag
}) => {
  return (
      <div>
        {cloth && (
        <div>
          <Star
            cloth={cloth}
            toggleFavorites={toggleFavorites}
            filledStar={filledStar}
          />
          {cardCross && <div onClick={removeFromTheBag} className="card__cross"></div>}
          <img className="card__img" src={cloth.pictures[0].url} alt="Loading..." />
          <h2 className="card__name">{cloth.name}</h2>
          <span className="card__color">{cloth.color}</span>
          <span className="card__price">{cloth.price}</span>
        </div>
        )}
    </div>
  );
};

export default Card;
