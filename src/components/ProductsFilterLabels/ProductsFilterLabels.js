import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const ProductsFilterLabels = () => {
  const productsListFilters = useSelector((store) => store.app.productsListFilters);

  const dispatch = useDispatch()


  console.log(productsListFilters)

  const removeFilter = (text) => {
    dispatch({
      type: 'REMOVE_PRODUCTS_LIST_FILTER',
      payload: productsListFilters.filter((filter) => filter.text !== text),
    })
  }


  return(
    <div className='products__sort__labels-wrapper'>
      {productsListFilters.map((filterLabel, index) => 
        <div onClick={() => removeFilter(filterLabel.text)} key={index} className='products__sort__label'>
          {filterLabel.filterName}:
          <span className='products__sort__label__value'>{filterLabel.text}</span>
        </div>
      )}
    </div>
  )
}

export default ProductsFilterLabels