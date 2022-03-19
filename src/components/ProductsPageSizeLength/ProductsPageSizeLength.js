import React from 'react'
import { useSelector, useDispatch } from "react-redux";

const ProductsPageSizeLength = ({sortedProductsLength}) => {
  const pageSize = useSelector(store => store.app.pageSize)

  const maxPageSizeNum = pageSize > sortedProductsLength ? sortedProductsLength : pageSize
  const versionOfResultWord = String(sortedProductsLength).slice(-1) === '1' ? 'результата' : 'результатов'

  return (
    <div className='products__page-size__text-length'>1&#8211;{maxPageSizeNum} из {sortedProductsLength} {versionOfResultWord}</div>
  )
}

export default ProductsPageSizeLength
