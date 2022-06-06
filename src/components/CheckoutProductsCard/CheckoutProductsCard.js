import React from "react";

const CheckoutProductsCard = ({productDataObj}) => {

 const {color, capacity, model} = productDataObj.description

  return(
    <div className='checkout__products__card'>
      <div className='checkout__products__card__img-wrapper'>
        <img className='checkout__products__card__img' src={productDataObj.pictures[0].url} alt="" />
      </div>
      <div>
        <h3 className='checkout__products__card__header'>{productDataObj.fullName} x{productDataObj.quantity}</h3>
        {!color && !capacity && model && (
          <span className='checkout__products__card__text'>{model}</span>
        )}
        {color && (
          <span className='checkout__products__card__text'>{color}</span>
        )}
        {capacity && (
          <span className='checkout__products__card__text'>{capacity}</span>
        )}  
      </div>
      <div className='checkout__products__card__price'>
        {productDataObj.price.toLocaleString()}.00&#x20b4;
      </div>
      <div className="checkout__products__card__line"></div>
    </div>
  )
}

export default CheckoutProductsCard