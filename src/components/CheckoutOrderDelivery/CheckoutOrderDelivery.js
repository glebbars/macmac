import React from "react";
import CheckoutOrderDeliveryPickup from '../CheckoutOrderDeliveryPickup/CheckoutOrderDeliveryPickup'
const CheckoutOrderDelivery = ({register}) => {

  return(
    <div className="checkout__order__delivery">
      <h2 className="checkout__order__subheader">Шаг 2 - Доставка</h2>
      <CheckoutOrderDeliveryPickup register={register}/>
    </div>
  )
}

export default CheckoutOrderDelivery