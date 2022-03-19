import React from 'react'
import ProductsSort from "../ProductsSort/ProductsSort";
import ProductsFilterLabels from '../ProductsFilterLabels/ProductsFilterLabels'
import ProductsFiltersMobileBtn from '../ProductsFiltersMobileBtn/ProductsFiltersMobileBtn'
import ProductsPageSize from '../ProductsPageSize/ProductsPageSize'
import ProductsPageSizeLength from '../ProductsPageSizeLength/ProductsPageSizeLength';
const ProductsListHeader = ({sortedProductsLength, toggleSideBar}) => {

  return (
    <div className="products__main__header">
      <div className='products__main__header__content'>
      {sortedProductsLength > 0 && 
        <div className='products__page-size'>
          <ProductsPageSizeLength sortedProductsLength={sortedProductsLength}/>
          <ProductsPageSize sortedProductsLength={sortedProductsLength}/>
        </div>}
        <ProductsFiltersMobileBtn toggleSideBar={toggleSideBar}/>
      {sortedProductsLength > 0 && <ProductsSort />}
      </div>
      <ProductsFilterLabels />
    </div>
  )
}

export default ProductsListHeader