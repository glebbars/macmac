import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";

const Bag = ({
  cardsArr,
  clothId,
  setClothId
}) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [addedToTheBag, setAddedToTheBag] = useState(
    JSON.parse(localStorage.getItem("addedToTheBag")) || []
  );
  

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("addedToTheBag", JSON.stringify(addedToTheBag));
  });

  const addToTheBag = (cardId) => {
    console.log(cardId);
    if (addedToTheBag.includes(cardId)) {
      setAddedToTheBag([...addedToTheBag]);
    } else {
      setAddedToTheBag([...addedToTheBag, cardId]);
    }
  };

  const toggleFavorites = (cardId) => {
    if (favorites.includes(cardId)) {
      setFavorites(favorites.filter((id) => id !== cardId));
    } else {
      setFavorites([...favorites, cardId]);
    }
  };

  const addedToTheBagArr = [];

  const addToTheBagFunc = (item) => {
    addedToTheBag.forEach((id) => {
      if (item.id === id) {
        return addedToTheBagArr.push(item);
      }
    });
  };

  for (let i = 0; i < cardsArr.length; i++) {
    addToTheBagFunc(cardsArr[i]);
  }

  const removeFromTheBag = (cardId) => {
    const cardIndex = addedToTheBag.indexOf(cardId) 
    delete addedToTheBag[cardIndex]
  }

  const listItems = addedToTheBagArr.map((cloth) => (
    <div className="card" key={cloth.id}>
      <Card
        toggleFavorites={toggleFavorites}
        cloth={cloth}
        filledStar={favorites.includes(cloth.id)}
        cardCross={true}
        setClothId={setClothId}
      />
    </div>
  ));

  return (
    <div className="cards-container">
      {listItems}
    </div>
  );
};

Bag.propTypes = {
  addedToTheBag: PropTypes.array.isRequired,
  cardsArr: PropTypes.array.isRequired,
  // toggleBag: PropTypes.func.isRequired,
  clothId: PropTypes.string.isRequired,
};

export default Bag;
