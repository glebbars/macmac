import React, {useEffect} from 'react'
import OrderForm from '../OrderForm/OrderForm'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"
import bag from '../../img/shopping-bag-black.svg'
import bagGrey from '../../img/shopping-bag.svg'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

export const openPopupboxOneClick = (productDataObj) => {
  const fullProductName = `- ${productDataObj.fullName} (${productDataObj.price.toLocaleString()}₴)`

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

export const PurchasePopUp = ({addedToBag, activePopUp, productDataObj, closePopUp}) => {

  useEffect(() => {
    localStorage.setItem("macmac-addedToBag", JSON.stringify(addedToBag));
 }, [addedToBag]);

 useEffect(() => {
  if(activePopUp){
    setTimeout(() => {
      closePopUp()
    }, 4000)
  }
 }, [activePopUp])

 const {color, capacity, model} = productDataObj.description

  return (
    <div className={`pop-up__purchase ${activePopUp ? 'pop-up__purchase_active' : ''}`}>
      <div onClick={closePopUp}  className='pop-up__purchase__close-wrapper'></div>
      <div className='pop-up__purchase__wrapper'>
        <div onClick={closePopUp} className='pop-up__purchase__cross'></div>
        <header className='pop-up__purchase__header'>
          <img src={bag} alt="" className='pop-up__purchase__header__img' />
          <h1 className='pop-up__purchase__header__text'>Корзина</h1>
          <Link to="/bag" className='pop-up__purchase__header__text pop-up__purchase__header__text_link'>Корзина</Link>
          {addedToBag.length > 0 && (
            <span className='pop-up__purchase__header__length'>
              <span className='pop-up__purchase__header__length__brace'>(</span>
                {addedToBag.length}
              <span className='pop-up__purchase__header__length__brace'>)</span>
            </span>
          )}
        </header>
        <main className='pop-up__purchase__main'>
          <span className='pop-up__purchase__main__label__name'>Название товара</span>
          <span className='pop-up__purchase__main__label__price'>Цена</span>
          <div className='pop-up__purchase__main__img-wrapper'>
            <img className='pop-up__purchase__main__img' src={productDataObj.pictures[0].url} alt="" />
          </div>
          <div className='pop-up__purchase__main__content'>
            <h2 className='pop-up__purchase__main__content__header'>{productDataObj.fullName}</h2>
            {!color && !capacity && model && 
              <p className='pop-up__purchase__main__content__text'>
                <span className='pop-up__purchase__main__content__text__label'>Модель: </span>
                {model}
                <span className='pop-up__purchase__main__content__text__coma'>&#44; &nbsp;</span>
              </p>
            }
            {color && 
              <p className='pop-up__purchase__main__content__text'>
                  <span className='pop-up__purchase__main__content__text__label'>Цвет: </span>
                  {color}
                  <span className='pop-up__purchase__main__content__text__coma'>&#44; &nbsp;</span>
              </p>
            }
            {capacity && 
              <p className='pop-up__purchase__main__content__text'>
                <span className='pop-up__purchase__main__content__text__label'>Память: </span>
                {capacity}
                <span className='pop-up__purchase__main__content__text__coma'>&#44; &nbsp;</span>
              </p>
            }
          </div>
          <h3  className='pop-up__purchase__main__price'>{productDataObj.price.toLocaleString()}.00&#x20b4;</h3>
        </main>
        <div className='pop-up__purchase__line'></div>
        <div className='pop-up__purchase__btns-wrapper'>
          <Link className='pop-up__purchase__btn-bag' to='/bag'>
            <img className='pop-up__purchase__btn-bag__img' src={bagGrey} alt="" />
            <span className='pop-up__purchase__btn-bag__text'>Корзина</span>
          </Link>
          <Link className='pop-up__purchase__btn-order' to='/checkout'>Оформить заказ</Link>
        </div>
      </div>
    </div>
  )
}


export const handlePurchaseSuccess = (id, handleClose) => {

  const closePopUp = () => {
    if(handleClose){
      handleClose()
    } else {
      PopupboxManager.close()
    }
  }

  const content = (
    <div className='pop-up__success__content'>
      <div className='pop-up__success__content__closing-cross' onClick={closePopUp}></div>
      <h1 className='pop-up__success__content__header'>Заказ успешно оформлен</h1>
      <p className='pop-up__success__content__text'>
        Номер вашего заказа:
        <span className='pop-up__success__content__text__order-id'>{id}</span>
      </p>
      <button className='pop-up__success__content__btn' onClick={closePopUp}>Продолжить покупки</button>
    </div>
  )

  PopupboxManager.open({
    content,
    config: {
      overlayClose: false,
      escClose: false,
      className: 'pop-up__success',
      titleBar: {
        enable: false
      },
      overlayOpacity: 0.5,
      fadeIn: true,
      fadeInSpeed: 300
    }
  })
}