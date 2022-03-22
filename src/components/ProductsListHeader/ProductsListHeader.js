import React from 'react'
import ProductsSort from "../ProductsSort/ProductsSort";
import ProductsFilterLabels from '../ProductsFilterLabels/ProductsFilterLabels'
import ProductsFiltersMobileBtn from '../ProductsFiltersMobileBtn/ProductsFiltersMobileBtn'
import ProductsPageSize from '../ProductsPageSize/ProductsPageSize'
import ProductsPageSizeLength from '../ProductsPageSizeLength/ProductsPageSizeLength';
import { useSelector } from "react-redux";

const ProductsListHeader = ({toggleSideBar}) => {
  const productsListFilters = useSelector((store) => store.app.productsListFilters);
  const sortedProductsLength = useSelector((store) => store.app.sortedProductsLength);

  return (
    <div className="products__main__header">
      {sortedProductsLength > 0 && <ProductsPageSizeLength sortedProductsLength={sortedProductsLength}/>}
      {sortedProductsLength > 0 && <ProductsPageSize sortedProductsLength={sortedProductsLength}/> }
      <ProductsFiltersMobileBtn toggleSideBar={toggleSideBar}/>
      {sortedProductsLength > 0 && <ProductsSort sortedProductsLength={sortedProductsLength}/>}
      {productsListFilters.length > 0 && <ProductsFilterLabels />}
    </div>
  )
}

export default ProductsListHeader