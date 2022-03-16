import React, {useEffect} from "react";
import ProductsSideBar from "../ProductsSideBar/ProductsSideBar";
import ProductsList from "../ProductsList/ProductsList";
import ProductsPageHeader from "../ProductsPageHeader/ProductsPageHeader";
import ProductsSort from "../ProductsSort/ProductsSort";
import ProductsFilterLabels from '../ProductsFilterLabels/ProductsFilterLabels'
import ProductsFiltersMobileBtn from '../ProductsFiltersMobileBtn/ProductsFiltersMobileBtn'
import { useState } from "react";
import {useLocation} from 'react-router-dom'

const ProductsPage = () => {
  const [activeSideBar, setActiveSideBar] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setActiveSideBar(false)
  }, [location])

  return (
    <div className="products">
      <ProductsPageHeader />
      <div className="products__section">
        <ProductsSideBar closeSideBar={() => setActiveSideBar(false)} activeSideBar={activeSideBar}/>
        <div className="products__section__main-content">
          <div className="products__section__main-content__header">
            <ProductsFiltersMobileBtn toggleSideBar={() => setActiveSideBar(!activeSideBar)}/>
            <ProductsSort />
          </div>
          <ProductsFilterLabels />
          <ProductsList />
        </div>
        {activeSideBar && <div onClick={() => setActiveSideBar(false)} className="products__sidebar__closing-popup"></div>}
      </div>
    </div>
  );
};

export default ProductsPage;