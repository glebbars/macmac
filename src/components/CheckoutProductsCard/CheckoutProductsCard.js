import React from "react";

const CheckoutProductsCard = ({productDataObj}) => {
  const fullProductName = `${productDataObj.category} ${productDataObj.model} ${productDataObj.capacity} ${productDataObj.color}`

  return(
    <div className='checkout__products__card'>
      <div className='checkout__products__card__img-wrapper'>
        <img className='checkout__products__card__img' src={productDataObj.pictures[0].url} alt="" />
      </div>
      <div>
        <h3 className='checkout__products__card__header'>{fullProductName} x{productDataObj.quantity}</h3>
        {!productDataObj.color && !productDataObj.capacity && productDataObj.model && (
          <span className='checkout__products__card__text'>{productDataObj.model}</span>
        )}
        {productDataObj.color && (
          <span className='checkout__products__card__text'>{productDataObj.color}</span>
        )}
        {productDataObj.capacity && (
          <span className='checkout__products__card__text'>{productDataObj.capacity}</span>
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