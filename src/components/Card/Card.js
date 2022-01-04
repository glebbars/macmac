import React from "react";
import PropTypes from "prop-types";
import Star from "../Star/Star";

const Card = ({
  cloth,
  toggleFavorites,
  filledStar,
  cardCross,
  toggleBag,
  setClothId,
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
          {cardCross && <div onClick={() => setClothId(cloth.id)} className="modal__cross modal__cross_card"></div>}
          <img className="card__img" src={cloth.pictures[0].url} alt="Loading..." />
          <h2 className="card__name">{cloth.name}</h2>
          <span className="card__color">{cloth.color}</span>
          <span className="card__price">{cloth.price}</span>
        </div>
        )}
    </div>
  );
};

Card.propTypes = {
  cloth: PropTypes.object.isRequired,
  toggleFavorites: PropTypes.func.isRequired,
  filledStar: PropTypes.bool.isRequired,
  cardCross: PropTypes.bool.isRequired,
};

export default Card;
