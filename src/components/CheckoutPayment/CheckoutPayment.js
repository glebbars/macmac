import React from "react";

const CheckoutPayment = ({register, errors}) => {

  return(
    <div className="checkout__order__payment">
      <h2 className="checkout__order__subheader">Шаг 3 - Оплата</h2>
      <div className="checkout__order__payment__option-wrapper">
        <label className='checkout__order__label'>
          <input 
            defaultChecked
            className='checkout__order__input' 
            {...register('payment')} 
            value='Наличные при получении'
            type="radio" 
          />
          <span className='checkout__order__input_custom'></span>
            Наличные при получении
        </label>
      </div>

      <div className="checkout__order__payment__option-wrapper">
        <label className='checkout__order__label'>
          <input 
            className='checkout__order__input' 
            {...register('payment')} 
            value='Опалата картой +3%'
            type="radio" 
          />
          <span className='checkout__order__input_custom'></span>
            Опалата картой +3%
        </label>
      </div>

      <div className="checkout__order__payment__option-wrapper">
        <label className='checkout__order__label'>
          <input 
            className='checkout__order__input' 
            {...register('payment')} 
            value='Опалата на расчётный счёт +1%'
            type="radio" 
          />
          <span className='checkout__order__input_custom'></span>
            Опалата на расчётный счёт +1%
        </label>
      </div>
  </div>
  )
}

export default CheckoutPayment