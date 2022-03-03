import React from "react";
import ProductsSideBar from "../ProductsSideBar/ProductsSideBar";
import ProductsList from "../ProductsList/ProductsList";
import ProductsPageHeader from "../ProductsPageHeader/ProductsPageHeader";
import ProductsSort from "../ProductsSort/ProductsSort";
import ProductsFilterLabels from '../ProductsFilterLabels/ProductsFilterLabels'
import ProductsFiltersMobileBtn from '../ProductsFiltersMobileBtn/ProductsFiltersMobileBtn'
import { useState } from "react";

const ProductsPage = () => {
  const [activeSideBar, setActiveSideBar] = useState(false)

  const toggleSideBar = () => setActiveSideBar(!activeSideBar)
  
  
  return (
    <div className="products">
      <ProductsPageHeader />
      <div className="products__section">
        <ProductsSideBar activeSideBar={activeSideBar}/>
        <div className="products__section_sort-list">
          <ProductsFiltersMobileBtn toggleSideBar={toggleSideBar}/>
          <ProductsSort />
          <ProductsFilterLabels />
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;