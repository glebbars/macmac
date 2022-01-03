import React, {useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import Home from "../components/Home/Home";
import Favourites from "../components/Favourites/Favourites";
import Bag from "../components/Bag/Bag";
import AdminPannel from "../admin/AdminPannel/AdminPannel";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";

const AppRoutes = () => {
  const [clothId, setClothId] = useState("");
  const [cardsArr, setCardsArr] = useState([]);
  const location = useLocation()

  useEffect(() => {
    if(!location.pathname.includes('admin')){
      console.log('-=')
      fetch("http://localhost:5000/posts")
      // fetch("https://my-test-admin.herokuapp.com/api/posts")
        .then(response => response.json())
        .then(data => setCardsArr(data));
    }
  }, [location]);

  return (
    <>
    <HeaderMenu/>
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
