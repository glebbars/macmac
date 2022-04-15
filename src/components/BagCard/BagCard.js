import React from 'react'

const BagCard = ({productDataObj, additionalClass}) => {
  const fullProductName = `${productDataObj.category} ${productDataObj.model} ${productDataObj.capacity} ${productDataObj.color}`

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
            <span className='pop-up__purchase__main__content__text__label'>Модель: </span>
              {productDataObj.model}
            <span className='pop-up__purchase__main__content__text__coma'>&#44; &nbsp;</span>
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
      <div className={`bag__main__card__info__line ${additionalClass}`}></div>
    </div>
    <div className='bag__main__card__price'>
      {productDataObj.price.toLocaleString()}.00&#x20b4;
    </div>
    <div className='bag__main__card__number'>
      number
    </div>
    <div className='bag__main__card__total'>
      {productDataObj.price.toLocaleString()}.00&#x20b4;
        <div className='bag__main__card__cross'></div>
    </div>
    </>
  )
}

export default BagCard