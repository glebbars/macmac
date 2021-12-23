import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "../components/Home/Home";
import Favourites from "../components/Favourites/Favourites";
import Bag from "../components/Bag/Bag";
import Modal from "../components/Modal/Modal";

const AppRoutes = ({ cardsArr }) => {
  const [openedFirstModal, setOpenedFirstModal] = useState(false);
  const [clothId, setClothId] = useState("");
  const [addedToTheBag, setAddedToTheBag] = useState(
    JSON.parse(localStorage.getItem("addedToTheBag")) || []
  );

  useEffect(() => {
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

  const modal = (
    <div>
      {openedFirstModal && (
        <Modal
          header="Want to buy this item?"
          closeButton={true}
          text="This modal is made for confirming the addition of chosen item into your shopping bag. In order to add this item press 'Ok', otherwise 'Cancel'"
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
                  addToTheBag(clothId);
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
      )}
    </div>
  );

  return (
    <>
      <Route
        path="/favourites"
        exact
        render={() => (
          <Favourites
            cardsArr={cardsArr}
            setOpenedFirstModal={setOpenedFirstModal}
            modal={modal}
            setClothId={setClothId}
          />
        )}
      />
      <Route
        path="/bag"
        exact
        render={() => (
          <Bag
            cardsArr={cardsArr}
            openedFirstModal={openedFirstModal}
            setOpenedFirstModal={setOpenedFirstModal}
            clothId={clothId}
            setClothId={setClothId}
            addedToTheBag={addedToTheBag}
          />
        )}
      />
      <Route
        path="/"
        exact
        render={() => (
          <Home
            cardsArr={cardsArr}
            setOpenedFirstModal={setOpenedFirstModal}
            modal={modal}
            setClothId={setClothId}
          />
        )}
      />
    </>
  );
};

AppRoutes.propTypes = {
  cardsArr: PropTypes.array.isRequired,
};

export default AppRoutes;
