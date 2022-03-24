import React from "react";
import tick from '../../img/tick.svg'
import ProductMainToggle from '../ProductMainToggle/ProductMainToggle'
import ProductMainPurchase from '../ProductMainPurchase/ProductMainPurchase'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import garanty from '../../img/shield.svg'
import arrows from '../../img/arrows.png'

const ProductMain = ({productDataObj}) => {
 
  return(
    <div className="product__main">
      <div className="product__main__header">
        {/* {productDataObj.label !== "" && <div className="product__main__header__label">{productDataObj.label}</div>}  */}
        <h1 className="product__main__header__text">{productDataObj.category} {productDataObj.model} {productDataObj.capacity} {productDataObj.color}</h1>
        <div className="product__main__header__label">Хит продаж</div>
        <div className="product__main__header__in-stock">
          <img src={tick} alt="" />
          <span className="product__main__header__in-stock__text">В наличии</span>
        </div>
      </div>
      <div className="product__main__price">{productDataObj.price.toLocaleString()}.00 &#x20b4;</div> 
      <div className="product__main__line"></div>
      <ProductMainToggle productDataObj={productDataObj}/>
      <ProductMainPurchase />
      <PopupboxContainer />
      <div className="product__main__info">
        <div className="product__main__info__label">
          <img src={garanty} alt="" className="product__main__info__label__img"/>
          <span className="product__main__info__label__text">Гарантия 12 месяцев </span>
        </div>
        <div className="product__main__info__label">
          <img src={arrows} alt="" className="product__main__info__label__img"/>
          <span className="product__main__info__label__text">Обмен / возврат 14дней </span>
        </div>
      </div>
    </div>
  )
}

export default ProductMain