import React from "react";
import PropTypes from "prop-types";
import Star from "../Star/Star";
import {FunctionField,ImageField, ImageInput} from 'react-admin'

const FilenameField = (props) => {

  return(
    <FunctionField {...props} render={record =>  <img alt='img' src={record.filename} />} />
  )
}

const PreviewImage = ({ record, source }) => {
  if (typeof (record) == "string") {
      record = {
          [source]: record
      }
  }
  return <ImageField record={record} source={source} />
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
      <div>
        {cloth && (
        <div>
          <Star
            cloth={cloth}
            toggleFavorites={toggleFavorites}
            filledStar={filledStar}
          />
          {cardCross && <div onClick={() => setClothId(cloth.id)} className="modal__cross modal__cross_card"></div>}
          {/* <FilenameField post={cloth}/>
          <ImageField source={cloth.pictures[0].rawFile.title} title={cloth.title} /> 
          <ImageInput source="preview">
            <PreviewImage source="src" />
          </ImageInput> */}
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
