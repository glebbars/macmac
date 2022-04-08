import React from 'react'
import OrderForm from '../OrderForm/OrderForm'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"

export const openPopupboxOneClick = (productDataObj) => {
  const fullProductName = `${productDataObj.category} ${productDataObj.model} ${productDataObj.capacity} ${productDataObj.color}`

  const productDataToBot = {
    order: fullProductName,
    price: productDataObj.price
  }

  const content = <OrderForm closePopUp={PopupboxManager.close} productDataToBot={productDataToBot}/>

  PopupboxManager.open({
    content,
    config: {
      overlayClose: true,
      escClose: true,
      className: 'pop-up__one-click',
      titleBar: {
        enable: false
      },
      overlayOpacity: 0.5,
      fadeIn: true,
      fadeInSpeed: 300
    }
  })
};

export const parchasePopUp = () => {

  return (
    <div>
      <div></div>
    </div>
  )
}