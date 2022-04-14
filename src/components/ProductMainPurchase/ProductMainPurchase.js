import React, { useState } from 'react'
import bagIcon from '../../img/product-bag.svg'
import {openPopupboxOneClick, PurchasePopUp} from '../PopUps/PopUps'
import { useDispatch, useSelector } from "react-redux";

const ProductMainPurchase = ({productDataObj}) => {
  const [openedPerchasePopUp, setOpenedPurchasePopUp] = useState(false)
  const addedToBag = useSelector((store) => store.app.addedToBag);
  const dispatch = useDispatch()

  const closePopUp = () => setOpenedPurchasePopUp(false)

  const addToTheBag = (productId) => {
    if(!addedToBag.includes(productId)){
      dispatch({
        type: 'ADD_TO_BAG',
        payload: [productId, ...addedToBag],
      });
    }
  };

  const scrollTop = () =>  window.scrollTo({top: 0,behavior: 'smooth'})

  return (
    <div className='product__main__purchase'>
      <div onClick={() => {
        addToTheBag(productDataObj.id);
        setOpenedPurchasePopUp(true)
        scrollTop()
      }} className='product__main__purchase__buy'>
        <img className='product__main__purchase__buy__img' src={bagIcon} alt="" />
        <span className='product__main__purchase__buy__text'>Купить</span>
      </div>
      <div onClick={() => {
        scrollTop()
        openPopupboxOneClick(productDataObj)
      }} className='product__main__purchase__one-click'>
        <span className='product__main__purchase__one-click__text'>Купить в один клик</span>
      </div>
      <PurchasePopUp addedToBag={addedToBag} closePopUp={closePopUp} activePopUp={openedPerchasePopUp} productDataObj={productDataObj} />
    </div>
  )
}

export default ProductMainPurchase