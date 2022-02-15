import React, { useEffect } from "react";
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

  const filterredArr = cardsArr.filter(product => {
    if(favorites.includes(product.id)){
      return product
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
