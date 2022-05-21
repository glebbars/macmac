import React from 'react'
import BagCard from '../BagCard/BagCard'
import { useDispatch } from 'react-redux';

const BagList = ({productsArr}) => {
  const dispatch = useDispatch()

  const removeFromTheBag = (productId, price) => {
    dispatch({
      type: 'REMOVE_FROM_BAG',
      payload: productsArr.filter(product => product.id !== productId)
    })
  };

  const changeTotalPrice = (type, id) => {
    const changedPorduct = productsArr.find(product => product.id === id)

    if(type === 'increase'){
      changedPorduct.quantity++
      dispatch({
        type: 'ADD_TO_BAG',
        payload: productsArr,
      });
    } else if ('decrease'){
      changedPorduct.quantity--
      dispatch({
        type: 'REMOVE_FROM_BAG',
        payload: productsArr,
      });
    }
  }

  return(
    <div className='bag__main__list'>
      <span className='bag__main__list__label'>Название товара</span>
      <span className='bag__main__list__label'>Цена</span>
      <span className='bag__main__list__label'>Количество</span>
      <span className='bag__main__list__label'>Всего</span>
      {productsArr.map(product => (
        <BagCard 
          changeTotalPrice={changeTotalPrice}
          removeFromTheBag={removeFromTheBag}
          key={product.id} 
          productDataObj={product} 
          isLastOne={product.id === productsArr[productsArr.length - 1].id}
        />
      ))}
    </div>
  )
}

export default BagList