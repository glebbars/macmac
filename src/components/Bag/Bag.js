import React, { useEffect } from "react";
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


  const filterredArr = cardsArr.filter(product => {
    if(addedToBag.includes(product.id)){
      return product
    }
  })

  return (
    <div className="cards-container">
      <ProductsList ableToBeRemoved={true} cardsArr={filterredArr}/>
    </div>
  );
};

export default Bag;
