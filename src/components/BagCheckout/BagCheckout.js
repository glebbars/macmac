import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const BagCheckout = ({productsArr}) => {
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const prices = productsArr.map(product => product.price * product.quantity)
    const total = prices.reduce((a, c) => a + c)
    setTotalPrice(total)
  }, [productsArr])

  const handleOrder = () => {

    // console.log({
    //   price: totalOrderPrice,
    //   order: productsArr
    // })
  }

  return(
    <div className='bag__checkout'>
      <div className='bag__checkout__total'>
        Итого к оплате:
        <span className='bag__checkout__total__price'>{totalPrice.toLocaleString()}.00&#x20b4;</span>
      </div>
      <div className='bag__checkout__line'></div>
      <div className='bag__checkout__btns-wrapper'>
        <div className='bag__checkout__btn__continue'>Продолжить покупки</div>
        <Link to='/checkout' onClick={handleOrder} className='bag__checkout__btn__order'>Оформить заказ</Link>
      </div>
    </div>
  )
}

export default BagCheckout