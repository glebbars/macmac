import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import List from '../List/List'

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
    <List ableToBeRemoved={false} productsArr={filterredArr}/>
  );
};

export default Favourites;
