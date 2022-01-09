import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductsList from '../ProductsList/ProductsList'
import { useSelector } from "react-redux";

const Favourites = () => {

  const cardsArr = useSelector((store) => store.app.cardsArr);
  const favorites = useSelector((store) => store.app.favorites);
  const addedToBag = useSelector((store) => store.app.addedToBag);

  useEffect(() => {
    localStorage.setItem("addedToBag", JSON.stringify(addedToBag));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, []);

  const filterredArr = cardsArr.filter(cloth => {
    if(favorites.includes(cloth.id)){
      return cloth
    }
  })

  return (
    <ProductsList ableToBeRemoved={false} cardsArr={filterredArr}/>
  );
};

Favourites.propTypes = {
  // cardsArr: PropTypes.array.isRequired,
};

export default Favourites;
