import React, { useState } from "react";
import CheckoutOrderDeliveryPickup from '../CheckoutOrderDeliveryPickup/CheckoutOrderDeliveryPickup'
import CheckoutOrderDeliveryCity from '../CheckoutOrderDeliveryCity/CheckoutOrderDeliveryCity'
import CheckoutOrderDeliveryNovaPoshta from '../CheckoutOrderDeliveryNovaPoshta/CheckoutOrderDeliveryNovaPoshta'

const CheckoutOrderDelivery = ({register, errors, setValue, control}) => {
  const [delivery, setDelivery] = useState('Самовывоз')

  return(
    <div className="checkout__order__delivery">
      <h2 className="checkout__order__subheader">Шаг 2 - Доставка</h2>
      <CheckoutOrderDeliveryPickup register={register} delivery={delivery} setDelivery={setDelivery} setValue={setValue} />
      <CheckoutOrderDeliveryCity register={register} delivery={delivery} setDelivery={setDelivery} errors={errors} setValue={setValue} />
      <CheckoutOrderDeliveryNovaPoshta register={register} delivery={delivery} setDelivery={setDelivery} errors={errors} setValue={setValue} control={control} />
    </div>
  )
}

export default CheckoutOrderDelivery