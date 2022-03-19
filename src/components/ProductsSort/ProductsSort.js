import React from 'react'
import { useState } from 'react'
import { useDispatch } from "react-redux";
import sortIcon from '../../img/sort-icon.svg'

const ProductsSort = () => {
  const [openedMenu, setOpenedMenu] = useState(false)
  const [sortName, setSortName] = useState('Популярности')
  const dispatch = useDispatch()

  const handleChange = (value, name) => {
    setOpenedMenu(false)
    setSortName(name)
    dispatch({
      type: 'UPDATE_SORT_TYPE',
      payload: value
    })
  }

  return(
    <div className='products__sort'>
      <img onClick={() => setOpenedMenu(!openedMenu)} src={sortIcon} alt="" className='products__sort__mobile-btn__img'/>
      <span onClick={() => setOpenedMenu(!openedMenu)} className='products__sort__header'>Сортировать по:</span>
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
          <label className='products__sort__select__label'>
            <input onClick={() => handleChange('price-increase', 'Возрастанию цены')} type="radio" name='sortName'/>
            Возрастанию цены
          </label>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProductsSort)