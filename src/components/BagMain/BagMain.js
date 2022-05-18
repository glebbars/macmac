import React, {useEffect, useState} from 'react'
import BagList from '../BagList/BagList'
import BagCheckout from '../BagCheckout/BagCheckout'
import { useDispatch, useSelector } from 'react-redux';

const BagMain = ({addedToBag, filteredArr}) => {
  const dispatch = useDispatch()
  const [finalProductsArr, setFinalOrder] = useState([])

  useEffect(() => {
    const sortedArr = filteredArr.sort((a, b) => {
      return addedToBag.indexOf(a.id) - addedToBag.indexOf(b.id)
    })

    sortedArr.forEach(product => product.quantity = 1)

    setFinalOrder(sortedArr)
  }, [addedToBag])


  const removeFromTheBag = (productId, price) => {
    console.log('****')
    dispatch({
      type: 'REMOVE_FROM_BAG',
      payload: addedToBag.filter((id) => id !== productId),
    })
  };


  return(
    <div className="bag__main__wrapper">
      {finalProductsArr.length > 0 && <BagList sortedArr={finalProductsArr} removeFromTheBag={removeFromTheBag} setFinalOrder={setFinalOrder} /> }
      {finalProductsArr.length > 0 && <BagCheckout sortedArr={finalProductsArr} /> }
    </div>
  )
}

export default BagMain