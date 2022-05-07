import React, { useState } from "react";
import CheckoutOrderDeliveryPickup from '../CheckoutOrderDeliveryPickup/CheckoutOrderDeliveryPickup'
import CheckoutOrderDeliveryCity from '../CheckoutOrderDeliveryCity/CheckoutOrderDeliveryCity'

const CheckoutOrderDelivery = ({register, errors}) => {
  const [delivery, setDelivery] = useState('Самовывоз')

  return(
    <div className="checkout__order__delivery">
      <h2 className="checkout__order__subheader">Шаг 2 - Доставка</h2>
      <CheckoutOrderDeliveryPickup register={register} delivery={delivery} setDelivery={setDelivery} />
      <CheckoutOrderDeliveryCity register={register} delivery={delivery} setDelivery={setDelivery} errors={errors} />
    </div>
  )
}

export default CheckoutOrderDelivery