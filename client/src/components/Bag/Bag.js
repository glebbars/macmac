import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";

const Bag = ({
  cardsArr,
  addToTheBag,
  openedFirstModal,
  setOpenedFirstModal,
  clothId,
  setClothId,
  addedToTheBag,
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
        openModal={() => {
          setOpenedFirstModal(true);
        }}
        setClothId={setClothId}
      />
    </div>
  ));

  return (
    <div className="cards-container">
      {listItems}
      {openedFirstModal && (
        <Modal
          header="Want to remove this item?"
          closeButton={true}
          text="This modal is made for confirming the remove of chosen item from your shopping bag. In order to remove this item press 'Ok', otherwise 'Cancel'"
          actions={
            <>
              <button
                onClick={() => setOpenedFirstModal(false)}
                style={{ backgroundColor: "white" }}
                className="modal__main-part-btn"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  setOpenedFirstModal(false);
                  removeFromTheBag(clothId);
                }}
                style={{ backgroundColor: "white" }}
                className="modal__main-part-btn"
              >
                Ok
              </button>
            </>
          }
          opened={openedFirstModal}
          mainBg="white"
          headerBg="white"
          closeModal={() => {
            setOpenedFirstModal(false);
          }}
        />
      )}{" "}
    </div>
  );
};

Bag.propTypes = {
  addedToTheBag: PropTypes.array.isRequired,
  cardsArr: PropTypes.array.isRequired,
  // toggleBag: PropTypes.func.isRequired,
  setOpenedFirstModal: PropTypes.func.isRequired,
  openedFirstModal: PropTypes.bool.isRequired,
  clothId: PropTypes.string.isRequired,
};

export default Bag;
