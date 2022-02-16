import React, { useEffect } from "react";
import ProductsList from '../ProductsList/ProductsList'
import { useSelector } from "react-redux";

const Favourites = () => {

  const productsArr = useSelector((store) => store.app.productsArr);
  const favorites = useSelector((store) => store.app.favorites);
  const addedToBag = useSelector((store) => store.app.addedToBag);

  useEffect(() => {
    localStorage.setItem("addedToBag", JSON.stringify(addedToBag));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, []);

  const filterredArr = productsArr.filter(product => {
    if(favorites.includes(product.id)){
      return product
    }
  })

  return (
    <ProductsList ableToBeRemoved={false} productsArr={filterredArr}/>
  );
};

export default Favourites;
