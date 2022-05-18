import React from 'react'
import CheckoutOrderPersonalData from '../CheckoutOrderPersonalData/CheckoutOrderPersonalData'
import CheckoutOrderDelivery from '../CheckoutOrderDelivery/CheckoutOrderDelivery'
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment'
import CheckoutComment from '../CheckoutComment/CheckoutComment'

const CheckoutOrder = ({register, errors, control, setValue}) => {

  return(
    <div className='checkout__order'>
      <h1 className='checkout__order__header'>Оформление заказа</h1>
      <CheckoutOrderPersonalData register={register} errors={errors} control={control} />

      <CheckoutOrderDelivery register={register} errors={errors} setValue={setValue} control={control} />

      <CheckoutPayment register={register} errors={errors} />

      <CheckoutComment register={register} errors={errors} />

    </div>
  )
}

export default CheckoutOrder