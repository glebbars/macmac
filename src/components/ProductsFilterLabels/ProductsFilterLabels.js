import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const ProductsFilterLabels = () => {
  const productsListFilters = useSelector((store) => store.app.productsListFilters);
  const dispatch = useDispatch()

  const removeFilter = (filterName, value) => {
    dispatch({
      type: 'REMOVE_PRODUCTS_LIST_FILTER',
      payload: productsListFilters.filter((filter) => filter.value !== value),
    })
  }

  return(
    <div className='products__sort__labels-wrapper'>
      {productsListFilters.map((filterLabel, index) => 
        <div onClick={() => removeFilter(filterLabel.filterName, filterLabel.value)} key={index} className='products__sort__label'>
          {filterLabel.filterName}:
          <span className='products__sort__label__value'>{filterLabel.value}</span>
        </div>
      )}
    </div>
  )
}

export default React.memo(ProductsFilterLabels)