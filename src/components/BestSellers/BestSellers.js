import React from 'react'
import List from '../List/List'
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const BestSellers = () => {
  const location = useLocation()
  const productsArr = useSelector(store => store.app.productsArr);

  if(productsArr.length === 0){
    return null
  }

  const fileteredArr = productsArr.filter(product => product.label && product.label === 'Хит продаж')

  return(
    <div id='best-sellers' className='best-sellers'>
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