import React from "react";
import { useSelector } from "react-redux";

const CheckoutConfirm = () => {
  const finalOrder = useSelector(store => store.app.finalOrder);

  console.log('finalOrder', finalOrder)

  return (
    <div className='checkout__confirm'>
      <button type='submit'>Confirm</button>
    </div>
  )
}

export default CheckoutConfirm