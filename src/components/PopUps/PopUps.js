import React, {useEffect} from 'react'
import OrderForm from '../OrderForm/OrderForm'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"
import bag from '../../img/shopping-bag-black.svg'
import bagGrey from '../../img/shopping-bag.svg'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";

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

export const PurchasePopUp = ({activePopUp, productDataObj, closePopUp}) => {
  const addedToBag = useSelector((store) => store.app.addedToBag);

  console.log(productDataObj.pictures)

  useEffect(() => {
    localStorage.setItem("addedToBag", JSON.stringify(addedToBag));
 }, [addedToBag]);

  return (
    <div className={`pop-up__purchase ${activePopUp ? 'pop-up__purchase_active' : ''}`}>
      <div onClick={closePopUp}  className='pop-up__purchase__close-wrapper'></div>
      <div className='pop-up__purchase__wrapper'>
        <div onClick={closePopUp} className='pop-up__purchase__cross'></div>
        <header className='pop-up__purchase__header'>
          <img src={bag} alt="" className='pop-up__purchase__header__img' />
          <h1 className='pop-up__purchase__header__text'>Корзина</h1>
          {addedToBag.length > 0 && <span className='pop-up__purchase__header__length'>{addedToBag.length}</span>}
        </header>
        <main className='pop-up__purchase__main'>
          <span className='pop-up__purchase__main__label-name'>Название товара</span>
          <span className='pop-up__purchase__main__label-price'>Цена</span>
          <div className='pop-up__purchase__main__img-wrapper'>
            <img className='pop-up__purchase__main__img' src={productDataObj.pictures[0].url} alt="" />
          </div>
          <div className='pop-up__purchase__main__content'>
            <h2 className='pop-up__purchase__main__content__header'>Apple iPhone X 128Gb Grey</h2>
            <span className='pop-up__purchase__main__content__text'>Емкость: 64Gb</span>
            <span className='pop-up__purchase__main__content__text'>Цвет: Space Grey</span>
          </div>
          <div>
            <h3  className='pop-up__purchase__main__price'>{productDataObj.price}</h3>
            <div className='pop-up__purchase__cross pop-up__purchase__cross_product'></div>
          </div>
        </main>
        <div className='pop-up__purchase__line'></div>
        <div className='pop-up__purchase__btns-wrapper'>
          <Link className='pop-up__purchase__btn-bag' to='bag'>
            <img src={bagGrey} alt="" />
            Корзина
          </Link>
          <Link className='pop-up__purchase__btn-order' to='order'>Оформить заказ</Link>
        </div>
      </div>
    </div>
  )
}