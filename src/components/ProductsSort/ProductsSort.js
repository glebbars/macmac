import Raact from 'react'
import { useState } from 'react'

const ProductsSort = () => {
  const [sortName, setSortName] = useState('Убыванию цены')

  
  return(
    <div className='products__sort'>
      <span className='products__sort__header'>Сортировать по:</span>
      <span className='products__sort__text'>{sortName}</span>
      <div className='products__sort__select'>
        <label>
          <input type="radio" name='sortName'/>
            Популярности
        </label>
        <label>
          <input type="radio" name='sortName'/>
           Убыванию цены
        </label>
        <label>
          <input type="radio" name='sortName'/>
           Возрастанию цены
        </label>
      </div>
    </div>
  )
}

export default ProductsSort