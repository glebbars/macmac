import React from 'react'
import List from '../List/List'
import { useSelector } from "react-redux";

const BestSellers = () => {
  const productsArr = useSelector(store => store.app.productsArr);

  const fileteredArr = productsArr.filter(product => product.label && product.label === 'Хит продаж')

  console.log(fileteredArr)

  return(
    <div className='best-sellers'>
      <h1 className='best-sellers__header'>Топ продаж</h1>
      {fileteredArr.length > 0 && (
        <List 
          className='best-sellers__list'
          productsArr={fileteredArr}
          productClassName='best-sellers__product'
        />
      )}
    </div>
  )
}

export default BestSellers