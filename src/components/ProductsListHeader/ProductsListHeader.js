import React from 'react'
import ProductsSort from "../ProductsSort/ProductsSort";
import ProductsFilterLabels from '../ProductsFilterLabels/ProductsFilterLabels'
import ProductsFiltersMobileBtn from '../ProductsFiltersMobileBtn/ProductsFiltersMobileBtn'

const ProductsListHeader = ({toggleSideBar}) => {

  return (
    <div className="products__main__header">
      <div className='products__main__header__content'>
        <ProductsFiltersMobileBtn toggleSideBar={toggleSideBar}/>
        <ProductsSort />
      </div>
      <ProductsFilterLabels />
    </div>
  )
}

export default ProductsListHeader