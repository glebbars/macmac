import React from "react";
import ProductsSideBar from "../ProductsSideBar/ProductsSideBar";
import ProductsList from "../ProductsList/ProductsList";
import ProductsPageHeader from "../ProductsPageHeader/ProductsPageHeader";
import ProductsSort from "../ProductsSort/ProductsSort";
import ProductsFilterLabels from '../ProductsFilterLabels/ProductsFilterLabels'
const ProductsPage = () => {
  
  return (
    <div className="products">
      <ProductsPageHeader />
      <div className="products__section">
        <ProductsSideBar />
        <div className="products__section_sort-list">
          <ProductsSort />
          <ProductsFilterLabels />
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;