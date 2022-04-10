import React from 'react'
import OrderForm from '../OrderForm/OrderForm'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"
import bag from '../../img/shopping-bag-black.svg'
import bagGrey from '../../img/shopping-bag.svg'
import {Link} from 'react-router-dom'

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

export const PurchasePopUp = ({productDataObj, closePopUp}) => {

  return (
    <div className='pop-up__purchase'>
      <div onClick={closePopUp}  className='pop-up__purchase__close-wrapper'></div>
      <div className='pop-up__purchase__wrapper'>
        <div onClick={closePopUp} className='pop-up__purchase__cross'></div>
        <header className='pop-up__purchase__header'>
          <img src={bag} alt="" className='pop-up__purchase__header__img' />
          <h1 className='pop-up__purchase__header__text'>Корзина</h1>
          <span className='pop-up__purchase__header__length'></span>
        </header>
        <main className='pop-up__purchase__main'>
          <span>Название товара</span>
          <span>Цена</span>
          <img src={productDataObj.pictures[0]} alt="" />
          <div>
            <h2>Apple iPhone X 128Gb Grey</h2>
            <span>Емкость: 64Gb</span>
            <span>Цвет: Space Grey</span>
          </div>
          <h3>{productDataObj.price}</h3>
          <div className='pop-up__purchase__cross pop-up__purchase__cross_product'></div>
        </main>
        <div className='pop-up__purchase__line'></div>
        <div>
          <Link to='bag'>
            <img src={bagGrey} alt="" />
            Корзина
          </Link>
          <Link to='order'>Оформить заказ</Link>
        </div>
      </div>
    </div>
  )
}