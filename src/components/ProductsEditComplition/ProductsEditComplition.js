import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

const ProductsEditComplition = ({ actionContent, handleComplete, handleClose}) => {
  const productsArr = useSelector((store) => store.app.productsArr);
  const [finalLength, setFinalLength] = useState('')

    useEffect(() => {
      if(actionContent[0] === 'sort'){
        console.log(actionContent[1])
        const word = getCorrectForm(actionContent[1])
        setFinalLength(`${actionContent[1]} ${word}`)
      }
    }, [actionContent])


  // const filteredByCategoryArr = productsArr.filter(product => {
  //   const currentPathName = window.location.pathname
  //   if(currentPathName.includes('/category/') && !currentPathName.includes('/all-products')){
  //     return product.category === currentPathName.split('/category/')[1]
  //   } else{
  //     return product
  //   }
  // })
  
  // const filteredProductsArr = filteredByCategoryArr.filter(product => {
  //   if(filtersTextArr && filtersTextArr.length > 0){
  //     const fullProductName = `${product.category} ${product.model} ${product.capacity} ${product.color}`
  //     return filtersTextArr.some(filter => fullProductName.includes(filter.toLowerCase()))
  //   } else{
  //     return product
  //   }
  // })
  // console.log(filteredProductsArr.length)
  
  const getCorrectForm = (num) => {
    const lastDigit = String(num).slice(-1)
    if(lastDigit === '1'){
      return 'результат';
    } else if(lastDigit === '2' || lastDigit === '3' || lastDigit === '4'){
      return 'результата'
    } else{
      return 'результатов'
    }
  }

  
  return(
    <div className='products__edit-complition'>
      <span className='products__edit-complition__text'>{finalLength}</span>
      <div className='products__edit-complition__btns-wrapper'>
        <div onClick={handleClose} className='products__edit-complition__btn products__edit-complition__btn_cancel'>Сбросить</div>
        <div onClick={handleComplete}  className='products__edit-complition__btn'>Применить</div>
      </div>
    </div>

  )
}

export default React.memo(ProductsEditComplition, (prevProps, nextProps) => {
 if( prevProps.actionContent[1] !== nextProps.actionContent[1] ){
   return false
 } else{
   return true
 }
})
