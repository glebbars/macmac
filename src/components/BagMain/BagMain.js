import React from 'react'
import BagList from '../BagList/BagList'
import BagCheckout from '../BagCheckout/BagCheckout'

const BagMain = ({addedToBag}) => {
  
  return(
    <div className="bag__main__wrapper">
      {addedToBag.length > 0 && <BagList productsArr={addedToBag} /> }
      {addedToBag.length > 0 && <BagCheckout productsArr={addedToBag} /> }
    </div>
  )
}

export default BagMain