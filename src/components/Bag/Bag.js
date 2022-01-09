import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductsList from '../ProductsList/ProductsList'
import { useSelector } from "react-redux";

const Bag = () => {

  const cardsArr = useSelector((store) => store.app.cardsArr);
  const favorites = useSelector((store) => store.app.favorites);
  const addedToBag = useSelector((store) => store.app.addedToBag);

  useEffect(() => {
    localStorage.setItem("addedToBag", JSON.stringify(addedToBag));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, []);


  const filterredArr = cardsArr.filter(cloth => {
    if(addedToBag.includes(cloth.id)){
      return cloth
    }
  })

  return (
    <div className="cards-container">
      <ProductsList ableToBeRemoved={true} cardsArr={filterredArr}/>
    </div>
  );
};

export default Bag;
