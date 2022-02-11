import React, {useEffect, Fragment } from "react";
import { Route, useLocation, Switch, Redirect } from "react-router-dom";
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

const AppRoutes = ({authProvider, dataProvider, history}) => {
  const dispatch = useDispatch();

  const location = useLocation()
  // const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    // if(!location.pathname.includes('admin')){
      // dispatch(getAllProducts());
    // }
  }, [location]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [])


  return (
    <div>
      {!location.pathname.includes('admin') && <HeaderMenu/>}
      <Switch>
        <Route path="/" exact render={() => includeFooter(Main)}/>
        <Route path="/admin" exact render={() => <AdminPannel dataProvider={dataProvider} authProvider={authProvider}  history={history} />}/>
        <Route path="/category/:categoryName" exact render={() => includeFooter(ProductsList)}/>
        <Route path="/favourites" exact render={() => includeFooter(Favourites)}/>
        <Route path="/bag" exact render={() => includeFooter(Bag)}/>
        <Route component={NotFound}/>
        <Redirect from="*" to="/" />
      </Switch>
    </div>
    );
};

const includeFooter = (Component) => <><Component /> <Footer /> </>

export default AppRoutes;
