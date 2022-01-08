import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import ProductsList from '../ProductsList/ProductsList'

const Favourites = ({
  cardsArr,
  setClothId,
}) => {

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const filterredArr = cardsArr.filter(cloth => {
    if(favorites.includes(cloth.id)){
      return cloth
    }
  })

  return (
    <ProductsList cardsArr={filterredArr}/>
  );
};

Favourites.propTypes = {
  cardsArr: PropTypes.array.isRequired,
};

export default Favourites;
