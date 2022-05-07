import React from 'react'
import CheckoutOrderPersonalData from '../CheckoutOrderPersonalData/CheckoutOrderPersonalData'

const CheckoutOrder = ({register, errors, control}) => {

  return(
    <div className='checkout__order'>
      <h1 className='checkout__order__header'>Оформление заказа</h1>
      <CheckoutOrderPersonalData register={register} errors={errors} control={control} />

    </div>
  )
}

export default CheckoutOrder