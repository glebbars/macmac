import React from "react";
import ProductsSideBar from "../ProductsSideBar/ProductsSideBar";
import ProductsList from "../ProductsList/ProductsList";
import ProductsPageHeader from "../ProductsPageHeader/ProductsPageHeader";

const ProductsPage = () => {


  return (
    <div className="products">
      <ProductsPageHeader />
      <div className="products__section">
        <ProductsSideBar />
        <ProductsList />
      </div>
    </div>
  );
};

export default ProductsPage;