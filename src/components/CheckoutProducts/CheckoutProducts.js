import React from "react";
import { useSelector } from "react-redux";
import CheckoutProductsConfirm from '../CheckoutProductsConfirm/CheckoutProductsConfirm'
import CheckoutProductsList from '../CheckoutProductsList/CheckoutProductsList'

const CheckoutProducts = () => {
  const addedToBag = useSelector((store) => store.app.addedToBag);
  
  console.log(addedToBag)

  return (
    <div className='checkout__products'>
      {addedToBag.length > 0 && <CheckoutProductsList productsArr={addedToBag} />}
      {addedToBag.length > 0 && <CheckoutProductsConfirm productsArr={addedToBag} />}
    </div>
  )
}

export default CheckoutProducts