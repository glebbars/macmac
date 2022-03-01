import React from 'react'

const ProductsFilterLabels = () => {

  return(
    <div className='products__sort__labels-wrapper'>
      <div className='products__sort__label'>
        Категория:
        <span className='products__sort__label__value'>iPhone</span>
      </div>
      <div className='products__sort__label'>
        Объём памяти:
        <span className='products__sort__label__value'>64Gb</span>
      </div>
      <div className='products__sort__label'>
      Категория
        <span className='products__sort__label__value'>Категория</span>
      </div>
    </div>
  )
}

export default ProductsFilterLabels