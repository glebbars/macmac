import React, {useEffect, useState} from 'react'
import BagList from '../BagList/BagList'
import BagCheckout from '../BagCheckout/BagCheckout'
import { useSelector } from 'react-redux';

const BagMain = ({addedToBag, filteredArr}) => {
  const [totalOrderPrice, setTotalOrderPrice] = useState(0)


  useEffect(() => {
    if(filteredArr.length > 0){
      const prices = filteredArr.map(product => product.price)
      const total = prices.reduce((a, c) => a + c)
      setTotalOrderPrice(total)
    }
  }, [])

  return(
    <div className="bag__main__wrapper">
      <BagList addedToBag={addedToBag} filteredArr={filteredArr} totalOrderPrice={totalOrderPrice} setTotalOrderPrice={setTotalOrderPrice}/>
      {totalOrderPrice > 0 && <BagCheckout totalOrderPrice={totalOrderPrice} />}
    </div>
  )
}

export default BagMain