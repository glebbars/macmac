import React, {useEffect} from "react";
import ProductsSideBar from "../ProductsSideBar/ProductsSideBar";
import ProductsList from "../ProductsList/ProductsList";
import ProductsPageHeader from "../ProductsPageHeader/ProductsPageHeader";
import ProductsSort from "../ProductsSort/ProductsSort";
import ProductsFiltersMobileBtn from '../ProductsFiltersMobileBtn/ProductsFiltersMobileBtn'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation} from 'react-router-dom'
import ProductsListHeader from '../ProductsListHeader/ProductsListHeader'
import RecentlyViewed from '../RecentlyViewed/RecentlyViewed'

const ProductsPage = () => {
  const [activeSideBar, setActiveSideBar] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if(activeSideBar){
      setActiveSideBar(false)
    }
  }, [location])

  return (
    <div className="products">
      <ProductsPageHeader />
      <div className="products__section">
        <ProductsSideBar closeSideBar={() => setActiveSideBar(false)} activeSideBar={activeSideBar}/>
        <div className="products__main">
           <ProductsListHeader toggleSideBar={() => setActiveSideBar(!activeSideBar)}/>
           <ProductsList location={location}/>
        </div>
        {activeSideBar && <div onClick={() => setActiveSideBar(false)} className="products__sidebar__closing-popup"></div>}
      </div>
      <RecentlyViewed className='recently-viewed_products-page'/>
    </div>
  );
};

export default ProductsPage;