import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import OrderForm from "../OrderForm/OrderForm";
import ProductsList from '../ProductsList/ProductsList'

const Home = ({ 
  cardsArr,
  setClothId 
}) => {

  return (
    <ProductsList cardsArr={cardsArr}/>
  );
};

Home.propTypes = {
  cardsArr: PropTypes.array.isRequired,
  // setClothId: PropTypes.func.isRequired,
};

export default Home;
