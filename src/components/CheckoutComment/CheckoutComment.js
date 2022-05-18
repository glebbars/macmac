import React from 'react'

const CheckoutComment = ({register, errors}) => {

  return(
    <div className="checkout__order__comment">
      <h2 className="checkout__order__subheader">Комментарий к заказу</h2>
      <textarea 
        {...register('comment')} 
        placeholder='Введите комментарий к заказу (опционально)'    
        className="checkout__order__comment__text-area"
      />

    </div>
  )
}

export default CheckoutComment