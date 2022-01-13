import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import OrderForm from "../OrderForm/OrderForm";
import ProductsList from '../ProductsList/ProductsList'
import { useSelector } from "react-redux";

const Home = () => {

  const cardsArr = useSelector(store => store.app.cardsArr)
  const favorites = useSelector(store => store.app.cardsArr)
  const addedToBag = useSelector((store) => store.app.addedToBag);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("addedToBag", JSON.stringify(addedToBag));
  }, []);

  return (
    // <OrderForm/>
    <div>1212</div>
    // <ProductsList ableToBeRemoved={false} cardsArr={cardsArr}/>
  );
};

Home.propTypes = {
// setClothId: PropTypes.func.isRequired,
};

export default Home;
