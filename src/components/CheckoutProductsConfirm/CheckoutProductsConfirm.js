import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CheckoutProductsConfirm = ({productsArr}) => {
  const percentToAdd = useSelector((store) => store.app.percentToAdd)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const prices = productsArr.map(product => product.price * product.quantity)
    const total = prices.reduce((a, c) => a + c)

    const percentToNum = Math.round(total / 100 * percentToAdd)
    const totalWithPercent = total + percentToNum

    setTotalPrice(totalWithPercent)
  }, [productsArr, percentToAdd])


  return (
    <div className='checkout__products__confirm'>
      <div className='checkout__products__confirm__total'>
        <span className='checkout__products__confirm__total__text'>Итого к оплате</span>
        <span className='checkout__products__confirm__total__price'>{totalPrice.toLocaleString()}.00&#x20b4;</span>
      </div>
      <button className='checkout__products__confirm__btn' type='submit'>Подтвердить заказ</button>
    </div>
  )
}

export default CheckoutProductsConfirm