import React, { useState } from 'react'
import bagIcon from '../../img/product-bag.svg'
import {openPopupboxOneClick, PurchasePopUp} from '../PopUps/PopUps'

const ProductMainPurchase = ({productDataObj}) => {
  const [openedPerchasePopUp, setOpenedPurchasePopUp] = useState(true)

  const closePopUp = () => setOpenedPurchasePopUp(false)

  return (
    <div className='product__main__purchase'>
      <div onClick={() => setOpenedPurchasePopUp(true)} className='product__main__purchase__buy'>
        <img className='product__main__purchase__buy__img' src={bagIcon} alt="" />
        <span className='product__main__purchase__buy__text'>Купить</span>
      </div>
      <div onClick={() => openPopupboxOneClick(productDataObj)} className='product__main__purchase__one-click'>
        <span className='product__main__purchase__one-click__text'>Купить в один клик</span>
      </div>
      <PurchasePopUp closePopUp={closePopUp} activePopUp={openedPerchasePopUp} productDataObj={productDataObj} />
    </div>
  )
}

export default ProductMainPurchase