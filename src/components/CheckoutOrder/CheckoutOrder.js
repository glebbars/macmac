import React from 'react'
import CheckoutOrderPersonalData from '../CheckoutOrderPersonalData/CheckoutOrderPersonalData'
import CheckoutOrderDelivery from '../CheckoutOrderDelivery/CheckoutOrderDelivery'


const CheckoutOrder = ({register, errors, control, setValue}) => {

  return(
    <div className='checkout__order'>
      <h1 className='checkout__order__header'>Оформление заказа</h1>
      <CheckoutOrderPersonalData register={register} errors={errors} control={control} />

      <CheckoutOrderDelivery register={register} errors={errors} setValue={setValue} control={control} />

    </div>
  )
}

export default CheckoutOrder