import React from "react";
import PropTypes from "prop-types";
import Star from "../Star/Star";
import {FunctionField,ImageField} from 'react-admin'

const FilenameField = (props) => {

  return(
    <FunctionField {...props} render={record =>  <img alt='img' src={record.filename} />} />
  )
}

const Card = ({
  cloth,
  toggleFavorites,
  filledStar,
  cardCross,
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
            setClothId(cloth.id);
          }}
          className="modal__cross modal__cross_card"
        ></div>
      )}
      {console.log(cloth, cloth.pictures[0].rawFile.path)}
      <img className="card__img" src={cloth.pictures[0].src} alt="12321" />
      <FilenameField />
      <ImageField source="pictures" src="rawFile.path" title="desc" />
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
};

export default Card;
