import React, { useState } from 'react'

const BagCard = ({productDataObj, isLastOne, removeFromTheBag, changeTotalPrice}) => {
  const [productsNum, setProductsNum] = useState(1)

  const fullProductName = `${productDataObj.category} ${productDataObj.model} ${productDataObj.capacity} ${productDataObj.color}`

  const decreaseNum = () => {
    if(productsNum > 1){
      setProductsNum(productsNum - 1)
      changeTotalPrice('decrease', productDataObj.price)
    }
  }

  const increaseNum = () => {
    if(productsNum < 10){
      setProductsNum(productsNum + 1)
      changeTotalPrice('increase', productDataObj.price)
    }
  }

  return(
    <>
    <div className='bag__main__card__info'>
      <div className='bag__main__card__info__img-wrapper'>
        <img className='bag__main__card__info__img' src={productDataObj.pictures[0].url} alt="" />
      </div>
      <div>
        <h3 className='bag__main__card__info__header'>{fullProductName}</h3>
        {!productDataObj.color && !productDataObj.capacity && productDataObj.model && 
          <p className='bag__main__card__info__header__text'>
            <span className='bag__main__card__info__header__text__label'>Модель: </span>
              {productDataObj.model}
            <span className='bag__main__card__info__header__text__coma'>&#44; &nbsp;</span>
          </p>
        }
        {productDataObj.color && 
          <p className='bag__main__card__info__header__text'>
            <span className='bag__main__card__info__header__text__label'>Цвет: </span>
              {productDataObj.color}
            <span className='bag__main__card__info__header__text__coma'>&#44; &nbsp;</span>
          </p>
        }
        {productDataObj.capacity && 
          <p className='bag__main__card__info__header__text'>
            <span className='bag__main__card__info__header__text__label'>Память: </span>
            {productDataObj.capacity}
            <span className='bag__main__card__info__header__text__coma'>&#44; &nbsp;</span>
          </p>
        }
      </div>
      <div className={`bag__main__card__info__line ${isLastOne ? 'bag__main__card__info__line_last' : ''}`}></div>
    </div>
    <div className='bag__main__card__price'>
      {productDataObj.price.toLocaleString()}.00&#x20b4;
    </div>
    <div className={`bag__main__card__number-wrapper ${isLastOne ? "bag__main__card__number-wrapper_last" : ""}`}>
      <div className='bag__main__card__total_mob'>
        {(productDataObj.price * productsNum).toLocaleString()}.00&#x20b4;
        <div onClick={() => removeFromTheBag(productDataObj.id, productDataObj.price * productsNum)} className='bag__main__card__cross'></div>
      </div>
      <div className='bag__main__card__number'>
        <span onClick={decreaseNum} className='bag__main__card__number__decrease'></span>
        <span className='bag__main__card__number__text'>{productsNum}</span>
        <span onClick={increaseNum} className='bag__main__card__number__increase'></span>
      </div>

    </div>

    <div className='bag__main__card__total'>
      {(productDataObj.price * productsNum).toLocaleString()}.00&#x20b4;
      <div onClick={() => removeFromTheBag(productDataObj.id, productDataObj.price * productsNum)} className='bag__main__card__cross'></div>
    </div>
    </>
  )
}

export default BagCard