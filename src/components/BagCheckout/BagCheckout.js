import React from 'react'

const BagCheckout = ({totalOrderPrice}) => {
  console.log(totalOrderPrice)

  return(
    <div className='bag__checkout'>
      <div className='bag__checkout__total'>
        Итого к оплате:
        <span className='bag__checkout__total__price'>{totalOrderPrice.toLocaleString()}.00&#x20b4;</span>
      </div>
      <div className='bag__checkout__line'></div>
      <div className='bag__checkout__btns-wrapper'>
        <div className='bag__checkout__btn__continue'>Продолжить покупки</div>
        <div className='bag__checkout__btn__order'>Оформить заказ</div>
      </div>
    </div>
  )
}

export default BagCheckout