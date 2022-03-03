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

  return (
    <div className="products">
      <ProductsPageHeader />
      <div className="products__section">
        <ProductsSideBar activeSideBar={activeSideBar}/>
        <div className="products__section_sort-list">
          <ProductsFiltersMobileBtn toggleSideBar={() => setActiveSideBar(!activeSideBar)}/>
          <ProductsSort />
          <ProductsFilterLabels />
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;