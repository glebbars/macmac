import React, { useEffect } from "react";
import ProductsList from '../ProductsList/ProductsList'
import { useSelector } from "react-redux";

const Bag = () => {

  const productsArr = useSelector((store) => store.app.productsArr);
  const favorites = useSelector((store) => store.app.favorites);
  const addedToBag = useSelector((store) => store.app.addedToBag);

  useEffect(() => {
    localStorage.setItem("addedToBag", JSON.stringify(addedToBag));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, []);


  const filterredArr = productsArr.filter(product => {
    if(addedToBag.includes(product.id)){
      return product
    }
  })

  return <ProductsList ableToBeRemoved={true} productsArr={filterredArr}/>
};

export default Bag;
