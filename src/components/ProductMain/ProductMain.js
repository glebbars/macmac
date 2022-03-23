import React from "react";
import tick from '../../img/tick.svg'
import {getCapacityChoices, getColorChoices} from '../../admin/AdditionalFunctions/AdditionalFunctions'

const ProductMain = ({productDataObj}) => {
  const colorChoices = getColorChoices(productDataObj.model)
  const capacityChoices = getCapacityChoices(productDataObj.model)

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
      {colorChoices.length > 0 && 
        <div className="product__main__color">
          <span className="product__main__color__text">Цвет</span>
          {colorChoices.map(colorObj => 
            <div className={`product__main__color__option ${productDataObj.color === colorObj.name ? "product__main__color__option_active" : ""}`} style={{background: colorObj.name.toLocaleLowerCase()}}>{colorObj.name}</div> 
          )}
        </div>
      }
      {capacityChoices.length > 0 && 
        <div className="product__main__capacity">
          <span className="product__main__capacity__text">Память</span>
          {capacityChoices.map(capacityObj => 
            <div className={`product__main__capacity__option ${productDataObj.capacity === capacityObj.name ? "product__main__capacity__option_active" : ""}`}>{capacityObj.name}</div> 
          )}
        </div>
      }  
    </div>
  )
}

export default ProductMain