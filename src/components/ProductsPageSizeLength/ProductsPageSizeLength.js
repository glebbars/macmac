import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

const ProductsPageSizeLength = ({sortedProductsLength}) => {
  const pageSize = useSelector(store => store.app.pageSize)
  const pageNum = useSelector(store => store.app.pageNum)
  const [currentArrLength, setCurrentArrLength] = useState('1-24')

  useEffect(() => {
    if(sortedProductsLength > pageSize){
      if(pageNum*24 > sortedProductsLength){
        setCurrentArrLength(`${((pageNum-1) *24) + 1}-${sortedProductsLength}`)
      } else{
        setCurrentArrLength(`${((pageNum-1) *24) + 1}-${pageNum * 24}`)
      }
    } else{
      setCurrentArrLength(`1-${sortedProductsLength}`)
    }
  }, [pageSize, pageNum])

  const versionOfResultWord = String(sortedProductsLength).slice(-1) === '1' ? 'результата' : 'результатов'

  return (
    <div className='products__page-size__text-length'>{currentArrLength} из {sortedProductsLength} {versionOfResultWord}</div>
  )
}

export default ProductsPageSizeLength
