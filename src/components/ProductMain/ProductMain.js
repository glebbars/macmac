import React from "react";
import tick from '../../img/tick.svg'
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
    </div>
  )
}

export default ProductMain