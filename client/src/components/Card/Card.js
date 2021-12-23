import React from "react";
import PropTypes from "prop-types";
import Star from "../Star/Star";

const Card = ({
  cloth,
  toggleFavorites,
  filledStar,
  cardCross,
  openModal,
  toggleBag,
  setClothId,
}) => {
  return (
    <>
      <Star
        cloth={cloth}
        toggleFavorites={toggleFavorites}
        filledStar={filledStar}
      />
      {cardCross && (
        <div
          onClick={() => {
            openModal();
            setClothId(cloth.id);
          }}
          className="modal__cross modal__cross_card"
        ></div>
      )}
      <img className="card__img" src={cloth.url} alt="12321" />
      <h2 className="card__name">{cloth.name}</h2>
      <span className="card__color">{cloth.color}</span>
      <span className="card__price">{cloth.price}</span>
    </>
  );
};

Card.propTypes = {
  cloth: PropTypes.object.isRequired,
  toggleFavorites: PropTypes.func.isRequired,
  filledStar: PropTypes.bool.isRequired,
  cardCross: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Card;
