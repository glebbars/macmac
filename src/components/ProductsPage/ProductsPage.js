import React from "react";
import ProductsSideBar from "../ProductsSideBar/ProductsSideBar";
import ProductsList from "../ProductsList/ProductsList";
import ProductsPageHeader from "../ProductsPageHeader/ProductsPageHeader";
import ProductsSort from "../ProductsSort/ProductsSort";


const ProductsPage = () => {


  return (
    <div className="products">
      <ProductsPageHeader />
      <div className="products__section">
        <ProductsSideBar />
        <div>
          <ProductsSort />
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;