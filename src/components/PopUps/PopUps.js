import React from 'react'
import OrderForm from '../OrderForm/OrderForm'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"

export const openPopupboxOneClick = () => {
  console.log("openpopup");
  const content = <OrderForm closePopUp={PopupboxManager.close} />

  PopupboxManager.open({
    content,
    config: {
      overlayClose: true,
      escClose: true,
      className: 'product__pop-up',
      titleBar: {
        enable: false
      },
      overlayOpacity: 0.5,
      fadeIn: true,
      fadeInSpeed: 300
    }
  })
};