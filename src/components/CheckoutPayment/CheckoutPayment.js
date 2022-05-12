import React from "react";

const CheckoutPayment = ({register, errors}) => {

  return(
    <div className="checkout__order__person">
      <h2 className="checkout__order__subheader">Шаг 1 - Оплата</h2>
      <label className='checkout__order__delivery__label'>
        <input 
          defaultChecked
          className='checkout__order__delivery__input' 
          {...register('payment')} 
          value='Наличные при получении'
          type="radio" 
        />
        <span className='checkout__order__delivery__input_custom'></span>
          Наличные при получении
      </label>

      <label className='checkout__order__delivery__label'>
        <input 
          className='checkout__order__delivery__input' 
          {...register('payment')} 
          value='Опалата картой +3%'
          type="radio" 
        />
        <span className='checkout__order__delivery__input_custom'></span>
          Опалата картой +3%
      </label>

      <label className='checkout__order__delivery__label'>
        <input 
          className='checkout__order__delivery__input' 
          {...register('payment')} 
          value='Опалата на расчётный счёт +1%'
          type="radio" 
        />
        <span className='checkout__order__delivery__input_custom'></span>
          Опалата на расчётный счёт +1%
      </label>
      
  </div>
  )
}

export default CheckoutPayment