import React from 'react'
import BagCard from '../BagCard/BagCard'

const BagList = ({sortedArr, removeFromTheBag, setTotalOrderPrice, totalOrderPrice}) => {

  const changeTotalPrice = (type, price) => {
    if(type === 'increase'){
      setTotalOrderPrice(totalOrderPrice + price)
    } else if ('decrease'){
      setTotalOrderPrice(totalOrderPrice - price)
    }
  }

  return(
    <div className='bag__main__list'>
      <span className='bag__main__list__label'>Название товара</span>
      <span className='bag__main__list__label'>Цена</span>
      <span className='bag__main__list__label'>Количество</span>
      <span className='bag__main__list__label'>Всего</span>
      {sortedArr.map(product => (
        <BagCard 
          changeTotalPrice={changeTotalPrice}
          removeFromTheBag={removeFromTheBag}
          key={product.id} 
          productDataObj={product} 
          isLastOne={product.id === sortedArr[sortedArr.length - 1].id}
        />
      ))}
    </div>
  )
}

export default BagList