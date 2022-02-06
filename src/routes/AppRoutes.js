import React, {useEffect, Fragment } from "react";
import { Route, useLocation, Switch, useRouteMatch, useHistory } from "react-router-dom";
import { getAllProducts } from "../redux/actions/data";
import { useDispatch } from "react-redux";
import Main from "../components/Main/Main";
import Favourites from "../components/Favourites/Favourites";
import Bag from "../components/Bag/Bag";
import AdminPannel from "../admin/AdminPannel/AdminPannel";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import ProductsList from "../components/ProductsList/ProductsList";
import NotFound from "../components/NotFound/NotFound";
import Footer from '../components/Footer/Footer'
import { Authenticated } from 'react-admin'

const AppRoutes = ({authProvider, dataProvider, history}) => {
  const dispatch = useDispatch();

  let { path, url } = useRouteMatch();

  const historry = useHistory()

  const location = useLocation()


  // const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    // if(!location.pathname.includes('admin')){
      dispatch(getAllProducts());
    // }
  }, [location]);


  return (
    <div>
      {!location.pathname.includes('admin') && <HeaderMenu/>}
      <Switch>
        <Route path="/" exact render={() => includeFooter(Main)}/>
        <Route path="/category/:categoryName" exact render={() => includeFooter(ProductsList)}/>
        <Route path="/favourites" exact render={() => includeFooter(Favourites)}/>
        <Route path="/bag" exact render={() => includeFooter(Bag)}/>
        <Route path="/admin" exact render={() => <AdminPannel dataProvider={dataProvider} authProvider={authProvider}  history={history} />}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
    );
};

const includeFooter = (Component) => <><Component /> <Footer /> </>

export default AppRoutes;
