import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import ProductsList from '../ProductsList/ProductsList'

const Favourites = ({
  cardsArr,
  setClothId,
}) => {

  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

  useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem('favorites')
  
      if (item) {
        setFavorites(item)
      }
    }
  
    window.addEventListener('storage', checkUserData)
  
    return () => {
      window.removeEventListener('storage', checkUserData)
    }
  }, [])
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
