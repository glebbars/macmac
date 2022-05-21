import React from "react";
import CheckoutProductsCard from '../CheckoutProductsCard/CheckoutProductsCard'


const CheckoutProductsList = ({productsArr}) => {
  console.log(productsArr)

  return (
    <div className='checkout__products__list'>
      <header className='checkout__products__list__header'>
        <h2 className='checkout__products__list__header__title'>Структура заказа</h2>
        <span className='checkout__products__list__header__btn'>Изменить</span>
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