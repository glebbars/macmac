import React from 'react'
import { useState } from 'react'
import { useDispatch } from "react-redux";
import sortIcon from '../../img/sort-icon.svg'
import ProductsEditComplition from '../ProductsEditComplition/ProductsEditComplition'

const ProductsSort = () => {
  const [openedMenu, setOpenedMenu] = useState(false)
  const [sortName, setSortName] = useState('Новизне')
  const dispatch = useDispatch()

  const handleChange = (value, name) => {
    if(window.innerWidth > 480){
      setOpenedMenu(false)
    }
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
          <h3 className='products__sort__header__modal'>Сортировка</h3>
          {/* <label className='products__sort__select__label'>
            <input onClick={() => handleChange('popularity', 'Популярности')} type="radio" name='sortName'/>
              Популярности
          </label> */}
          <label className='products__sort__select__label products__sort__select__label_novelty'>
            <input defaultChecked className='products__sort__select__input' onClick={() => handleChange('novelty', 'Новизне')} type="radio" name='sortName'/>
            <span className='products__sort__select__input_custom'></span>
              Новизне
          </label>
          <label className='products__sort__select__label  products__sort__select__label_decrease'>
            <input className='products__sort__select__input' onClick={() => handleChange('price-decrease', 'Убыванию цены')} type="radio" name='sortName'/>
            <span className='products__sort__select__input_custom'></span>

            Убыванию цены
          </label>
          <label className='products__sort__select__label  products__sort__select__label_increase'>
            <input className='products__sort__select__input' onClick={() => handleChange('price-increase', 'Возрастанию цены')} type="radio" name='sortName'/>
            <span className='products__sort__select__input_custom'></span>
             Увеличению цены
          </label>
          <div onClick={() => setOpenedMenu(false)} className="products__sidebar__closing-cross"></div>
          <ProductsEditComplition />
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProductsSort)