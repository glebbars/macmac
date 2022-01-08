import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import OrderForm from "../OrderForm/OrderForm";

const ProductsList = ({ 
  cardsArr,
  setClothId 
}) => {

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  const toggleFavorites = (cardId) => {
    if (favorites.includes(cardId)) {
      setFavorites(favorites.filter((id) => id !== cardId));
    } else {
      setFavorites([cardId, ...favorites]);
    }
  };


  return (
    <div className="cards-container">
      {cardsArr.map((cloth) => (
        <div className="card" key={cloth.id}>
          <Card
            toggleFavorites={toggleFavorites}
            cloth={cloth}
            filledStar={favorites.includes(cloth.id)}
            cardCross={false}
          />
          <Button
            text="Add to cart"
            clothId={cloth.id}
            bg="black"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
