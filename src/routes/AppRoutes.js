import React, {useEffect, Fragment } from "react";
import { Route, useLocation, Switch, Redirect } from "react-router-dom";
import { getAllProducts } from "../redux/actions/data";
import { useDispatch } from "react-redux";
import Main from "../components/Main/Main";
import Favourites from "../components/Favourites/Favourites";
import Bag from "../components/Bag/Bag";
import AdminPannel from "../admin/AdminPannel/AdminPannel";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import ProductsPage from "../components/ProductsPage/ProductsPage";
import NotFound from "../components/NotFound/NotFound";
import Footer from '../components/Footer/Footer'
import {categoryProductsOptions, modelIphoneOptions} from '../components/additionalObjects/additionalObjects'
import Product from '../components/Product/Product'
import Checkout from '../components/Checkout/Checkout'

const AppRoutes = ({authProvider, dataProvider, history}) => {
  const dispatch = useDispatch();
  const location = useLocation()

  useEffect(() => {
    dispatch(getAllProducts());
  }, [])
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location]);


  return (
    <div>
      {!location.pathname.includes('admin') && <HeaderMenu/>}
      <Switch>
        <Route path="/" exact render={() => includeFooter(Main)}/>
        <Route path="/admin" exact render={() => <AdminPannel dataProvider={dataProvider} authProvider={authProvider}  history={history} />}/>
        <Route path={["/category/:categoryName", "/search/:searchResult"]} exact render={() => includeFooter(ProductsPage)}/>
        <Route path="/category/:categoryName/:id" exact render={() => includeFooter(Product)}/>
        <Route path="/favourites" exact render={() => includeFooter(Favourites)}/>
        <Route path="/bag" exact render={() => includeFooter(Bag)}/>
        <Route path="/checkout" exact render={() => includeFooter(Checkout)}/>
        <Route component={NotFound}/>
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </div>
    );
};

const includeFooter = (Component) => <><Component /> <Footer /> </>

export default AppRoutes;
