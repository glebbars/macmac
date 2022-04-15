import React from 'react'
import BagCard from '../BagCard/BagCard'

const BagList = ({productsArr}) => {

  const lastProductId = productsArr[productsArr.length - 1].id

  return(
    <div className='bag__main__list'>
      <span className='bag__main__list__label'>Название товара</span>
      <span className='bag__main__list__label'>Цена</span>
      <span className='bag__main__list__label'>Количество</span>
      <span className='bag__main__list__label'>Всего</span>
      {productsArr.map(product => (
        <BagCard 
          key={product.id} 
          productDataObj={product} 
          additionalClass={product.id === lastProductId ? 'bag__main__card__info__line_last' : ''}
        />
      ))}
    </div>
  )
}

export default BagList