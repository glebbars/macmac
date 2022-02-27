import React from "react";
import ProductsSideBar from "../ProductsSideBar/ProductsSideBar";
import ProductsList from "../ProductsList/ProductsList";
import ProductsPageHeader from "../ProductsPageHeader/ProductsPageHeader";
import ProductsSort from "../ProductsSort/ProductsSort";
import OrderForm from '../OrderForm/OrderForm'

const ProductsPage = () => {


  return (
    <div className="products">
      <ProductsPageHeader />
      <OrderForm />
      <div className="products__section">
        <ProductsSideBar />
        <div className="products__section_sort-list">
          <ProductsSort />
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;