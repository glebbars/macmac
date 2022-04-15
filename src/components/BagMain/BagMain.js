import React from 'react'
import BagList from '../BagList/BagList'
import BagCheckout from '../BagCheckout/BagCheckout'

const BagMain = ({productsArr}) => {

  return(
    <div className="bag__main__wrapper">
      <BagList productsArr={productsArr} />
      <BagCheckout />
    </div>
  )
}

export default BagMain