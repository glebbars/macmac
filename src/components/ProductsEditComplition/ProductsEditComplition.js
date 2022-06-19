import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

const ProductsEditComplition = ({ handleComplete, handleReset}) => {
  const sortedProductsLength = useSelector((store) => store.app.sortedProductsLength);

  const getCorrectForm = () => {
    const lastDigit = String(sortedProductsLength).slice(-1)
    const lastTwoDigits = String(sortedProductsLength).slice(-2)

    if(lastDigit === '1' && lastTwoDigits !== '11' ){
      return `${sortedProductsLength} результат`;
    } else if((lastDigit === '2' || lastDigit === '3' || lastDigit === '4') && (lastTwoDigits !== '11' && lastTwoDigits !== '12' && lastTwoDigits !== '13')){
      return `${sortedProductsLength} результата`
    } else{
      return `${sortedProductsLength} результатов`
    }
  }

  
  return(
    <div className='products__edit-complition'>
      <span className='products__edit-complition__text'>{getCorrectForm()}</span>
      <div className='products__edit-complition__btns-wrapper'>
        <div onClick={handleReset} className='products__edit-complition__btn products__edit-complition__btn_cancel'>Сбросить</div>
        <div onClick={handleComplete}  className='products__edit-complition__btn'>Применить</div>
      </div>
    </div>

  )
}

export default ProductsEditComplition
