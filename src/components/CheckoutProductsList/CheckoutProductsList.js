import React from "react";
import CheckoutProductsCard from '../CheckoutProductsCard/CheckoutProductsCard'
import { Link } from 'react-router-dom'


const CheckoutProductsList = ({productsArr}) => {

  return (
    <div className='checkout__products__list'>
      <header className='checkout__products__list__header'>
        <h2 className='checkout__products__list__header__title'>Структура заказа</h2>
        <Link to='/bag' className='checkout__products__list__header__btn'>Изменить</Link>
      </header>
      <main>
        {productsArr.map(product => (
          <CheckoutProductsCard key={product.id} productDataObj={product} />
        ))}
        <div className="checkout__products__list__line"></div>
      </main>
    </div>
  )
}

export default CheckoutProductsList