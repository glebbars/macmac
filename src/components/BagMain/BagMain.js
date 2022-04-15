import React from 'react'
import BagList from '../BagList/BagList'
import BagCheckout from '../BagCheckout/BagCheckout'

const BagMain = ({addedToBag}) => {

  return(
    <div className="bag__main__wrapper">
      <BagList addedToBag={addedToBag} />
      <BagCheckout />
    </div>
  )
}

export default BagMain