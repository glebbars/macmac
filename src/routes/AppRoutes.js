import React, {useEffect, useStatem } from "react";
import { Route, useLocation, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import Favourites from "../components/Favourites/Favourites";
import Bag from "../components/Bag/Bag";
import AdminPannel from "../admin/AdminPannel/AdminPannel";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";

import { getAllProducts } from "../redux/actions/data";
import { useDispatch } from "react-redux";


const AppRoutes = ({authProvider, dataProvider, history}) => {
  const dispatch = useDispatch();
  // const location = useLocation()

  useEffect(() => {
    // if(!location.pathname.includes('admin')){
      dispatch(getAllProducts());
    // }
  }, []);


  return (
    <div className="container">
      <HeaderMenu/>
        <Switch>
          <Route
            path="/favourites"
            exact
            component={Favourites}
          />
          <Route
            path="/bag"
            exact
            component={Bag}
          />
          <Route
            path="/admin"
            exact
            render={() => <AdminPannel dataProvider={dataProvider} authProvider={authProvider}  history={history} />}
          />
          <Route
            path="/"
            exact
            component={Home}
          />
        </Switch>
    </div>
    );
};

export default AppRoutes;
