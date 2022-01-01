import React, {useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Favourites from "../components/Favourites/Favourites";
import Bag from "../components/Bag/Bag";
import AdminPannel from "../components/AdminPannel/AdminPannel";

const AppRoutes = () => {
  const [clothId, setClothId] = useState("");
  const [cardsArr, setCardsArr] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/glebbars/admin-pannel-db/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardsArr(data);
      });
  }, []);

  return (
    <>
      <Route
        path="/favourites"
        exact
        render={() => <Favourites cardsArr={cardsArr}/>}
      />
      <Route
        path="/bag"
        exact
        render={() => <Bag cardsArr={cardsArr} />}
      />
      <Route
        path="/admin"
        exact
        component={AdminPannel}
      />
      <Route
        path="/"
        exact
        render={() => <Home cardsArr={cardsArr}/> }
      />
    </>
  );
};

export default AppRoutes;
