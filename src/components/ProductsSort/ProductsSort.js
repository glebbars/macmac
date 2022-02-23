import Raact from 'react'
import { useState } from 'react'

const ProductsSort = () => {
  const [openedMenu, setOpenedMenu] = useState(false)
  const [sortName, setSortName] = useState('Убыванию цены')

  const handleChange = (value, name) => {
    setOpenedMenu(false)
    setSortName(name)
  }

  return(
    <div className='products__sort'>
      <span className='products__sort__header'>Сортировать по:</span>
      <div className='products__sort__content-wrapper'>
        <span onClick={() => setOpenedMenu(!openedMenu)} className={`products__sort__text ${openedMenu ? 'products__sort__text_active' : ''}`}>{sortName}</span>
        <div className={`products__sort__select ${openedMenu ? 'products__sort__select_active' : ''}`}>
          <label className='products__sort__select__label'>
            <input onClick={() => handleChange('popularity', 'Популярности')} type="radio" name='sortName'/>
              Популярности
          </label>
          <label className='products__sort__select__label'>
            <input onClick={() => handleChange('price-decrease', 'Убыванию цены')} type="radio" name='sortName'/>
            Убыванию цены
          </label>
          <label onClick={() => handleChange('price-increase', 'Возрастанию цены')} className='products__sort__select__label'>
            <input type="radio" name='sortName'/>
            Возрастанию цены
          </label>
        </div>
      </div>
    </div>
  )
}

export default ProductsSort