import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BagCard from '../BagCard/BagCard'

const BagList = ({addedToBag}) => {
  const productsArr = useSelector((store) => store.app.productsArr)
  const dispatch = useDispatch()

  const filteredArr = productsArr.filter(product => addedToBag.includes(product.id))

  const sortedArr = filteredArr.sort((a, b) => {
    return addedToBag.indexOf(a.id) - addedToBag.indexOf(b.id)
  })

  const removeFromTheBag = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_BAG',
      payload: addedToBag.filter((id) => id !== productId),
    })
  };

  return(
    <div className='bag__main__list'>
      <span className='bag__main__list__label'>Название товара</span>
      <span className='bag__main__list__label'>Цена</span>
      <span className='bag__main__list__label'>Количество</span>
      <span className='bag__main__list__label'>Всего</span>
      {sortedArr.map(product => (
        <BagCard 
          removeFromTheBag={removeFromTheBag}
          key={product.id} 
          productDataObj={product} 
          additionalClass={product.id === sortedArr[sortedArr.length - 1].id ? 'bag__main__card__info__line_last' : ''}
        />
      ))}
    </div>
  )
}

export default BagList