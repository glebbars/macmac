import React, {useEffect } from "react";
import { Route, useLocation, Switch, useRouteMatch, useHistory } from "react-router-dom";
import Main from "../components/Main/Main";
import Favourites from "../components/Favourites/Favourites";
import Bag from "../components/Bag/Bag";
import AdminPannel from "../admin/AdminPannel/AdminPannel";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import ProductsList from "../components/ProductsList/ProductsList";
import NotFound from "../components/NotFound/NotFound";

import { getAllProducts } from "../redux/actions/data";
import { useDispatch } from "react-redux";

const AppRoutes = ({authProvider, dataProvider, history}) => {
  const dispatch = useDispatch();

  let { path, url } = useRouteMatch();

  const historry = useHistory()

  console.log('history', historry)

  // const location = useLocation()

  useEffect(() => {
    console.log('*')
    // if(!location.pathname.includes('admin')){
      dispatch(getAllProducts());
    // }
  }, []);


  return (
    <div>
      <HeaderMenu/>
        <Switch>
          <Route path="/favourites" exact component={Favourites}/>
          <Route path="/bag" exact component={Bag}/>
          <Route path="/admin" exact render={() => <AdminPannel dataProvider={dataProvider} authProvider={authProvider}  history={history} />}/>
          <Route path="/category/:categoryName" exact component={ProductsList}/>
          <Route path="/" exact component={Main}/>
          <Route path="*" exact component={NotFound}/>
        </Switch>
    </div>
    );
};

export default AppRoutes;
