import React from 'react'
import BagCard from '../BagCard/BagCard'

const BagList = ({sortedArr, removeFromTheBag, setFinalOrder}) => {

  const changeTotalPrice = (type, price, id) => {
    const changedPorduct = sortedArr.find(product => product.id === id)

    if(type === 'increase'){
      changedPorduct.quantity++
      setFinalOrder([...sortedArr])
    } else if ('decrease'){
      changedPorduct.quantity--
      setFinalOrder([...sortedArr])
    }

    const quantities = sortedArr.map(el => el.quantity)
    console.log(quantities)
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