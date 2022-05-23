import React from "react";
import CheckoutProductsConfirm from '../CheckoutProductsConfirm/CheckoutProductsConfirm'
import CheckoutProductsList from '../CheckoutProductsList/CheckoutProductsList'

const CheckoutProducts = ({addedToBag, percentToAdd}) => {

  return (
    <div className='checkout__products'>
      {addedToBag.length > 0 && <CheckoutProductsList productsArr={addedToBag} />}
      {addedToBag.length > 0 && <CheckoutProductsConfirm productsArr={addedToBag} percentToAdd={percentToAdd} />}
    </div>
  )
}

export default CheckoutProducts