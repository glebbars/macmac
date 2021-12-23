import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";

const Home = ({ 
  cardsArr, 
  setOpenedFirstModal, 
  modal, 
  setClothId 
}) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  const toggleFavorites = (cardId) => {
    if (favorites.includes(cardId)) {
      setFavorites(favorites.filter((id) => id !== cardId));
    } else {
      setFavorites([...favorites, cardId]);
    }
  };

  const listItems = cardsArr.map((cloth) => (
    <div className="card" key={cloth.id}>
      <Card
        toggleFavorites={toggleFavorites}
        cloth={cloth}
        filledStar={favorites.includes(cloth.id)}
        cardCross={false}
        openModal={() => {
          setOpenedFirstModal(true);
        }}
      />
      <Button
        text="Add to cart"
        modalHandler={(clothId) => {
          setOpenedFirstModal(true);
          setClothId(clothId);
        }}
        clothId={cloth.id}
        bg="black"
      />
    </div>
  ));

  return (
    <div className="cards-container">
      {listItems}
      {modal}
    </div>
  );
};

Home.propTypes = {
  cardsArr: PropTypes.array.isRequired,
  setOpenedFirstModal: PropTypes.func.isRequired,
  modal: PropTypes.node.isRequired,
  setClothId: PropTypes.func.isRequired,
};

export default Home;
