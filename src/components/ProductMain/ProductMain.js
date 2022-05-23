import React, { useEffect } from "react";
import tick from '../../img/tick.svg'
import ProductMainToggle from '../ProductMainToggle/ProductMainToggle'
import ProductMainPurchase from '../ProductMainPurchase/ProductMainPurchase'
import { PopupboxContainer } from 'react-popupbox';
import orangeArrows from '../../img/two-arrows.svg'
import orangeGaranty from '../../img/warranty.svg'
import orangeNovaPoshta from '../../img/nova-poshta.png'
import orangeTruck from '../../img/truck-orange.svg'
import orangeCash from '../../img/cash-orange.svg'
import orangeCreditCard from '../../img/credit-card-orange.svg'
import orangeBankAccount from '../../img/bank-account-orange.svg'
import { useDispatch, useSelector } from "react-redux";

const ProductMain = ({productDataObj, setProductDataObj}) => {
  const recentlyViewed = useSelector((store) => store.app.recentlyViewed);
  const dispatch = useDispatch()

  useEffect(() => {
    if(!recentlyViewed.includes(productDataObj.id)){
      const newRecentlyViewedArr = [productDataObj.id, ...recentlyViewed]

      if(recentlyViewed.length === 4){
        newRecentlyViewedArr.splice(-1)
      }
      dispatch({
        type: 'ADD_RECENTLY_VIEWED',
        payload: newRecentlyViewedArr
      })
    }
  }, [])
 
  return(
    <div className="product__main">
      <div className="product__main__header">
        <h1 className="product__main__header__text">{productDataObj.category} {productDataObj.model} {productDataObj.capacity} {productDataObj.color}</h1>
        {productDataObj.label === 'Хит продаж' && <div className="product__main__header__label">{productDataObj.label}</div>} 
        <div className="product__main__header__in-stock">
          <img src={tick} alt="" />
          <span className="product__main__header__in-stock__text">В наличии</span>
        </div>
      </div>
      <div className="product__main__price">{productDataObj.price.toLocaleString()}.00 &#x20b4;</div> 
      <div className="product__main__line"></div>
      <ProductMainToggle productDataObj={productDataObj} setProductDataObj={setProductDataObj}/>
      <ProductMainPurchase productDataObj={productDataObj}/>

      <div className="product__main__info">

        <div className="product__main__info__delivery">
          <h3 className="product__main__info__header">Способы доставки</h3>
          <div className="product__main__info__label">
            <img src={orangeTruck} alt="" className="product__main__info__label__img"/>
            <span className="product__main__info__label__text">Самовывоз из магазина</span>
          </div>
          <div className="product__main__info__label">
            <img src={orangeNovaPoshta} alt="" className="product__main__info__label__img"/>
            <span className="product__main__info__label__text">Нова Пошта (100% предоплата)</span>
          </div>
        </div>


        <div className="product__main__info__paying-ways">
          <h3 className="product__main__info__header">Способы оплаты</h3>

          
          <div className="product__main__info__label">
            <img src={orangeCreditCard} alt="" className="product__main__info__label__img"/>
            <span className="product__main__info__label__text">Опалата картой +3%</span>
          </div>
          <div className="product__main__info__label">
            <img src={orangeCash} alt="" className="product__main__info__label__img"/>
            <span className="product__main__info__label__text">Наличными при получении</span>
          </div>
          <div className="product__main__info__label">
            <img src={orangeBankAccount} alt="" className="product__main__info__label__img"/>
            <span className="product__main__info__label__text">Опалата на расчётный счёт +1%</span>
          </div>
        </div>

       <div className="product__main__info__line"></div>


        <div className="product__main__info__rules">
          <div className="product__main__info__label">
            <img src={orangeGaranty} alt="" className="product__main__info__label__img"/>
            <span className="product__main__info__label__text">Гарантия 12 месяцев </span>
          </div>
          <div className="product__main__info__label">
            <img src={orangeArrows} alt="" className="product__main__info__label__img"/>
            <span className="product__main__info__label__text">Обмен / возврат 14дней </span>
          </div>
        </div>

      </div>
      <PopupboxContainer />
    </div>
  )
}

export default ProductMain