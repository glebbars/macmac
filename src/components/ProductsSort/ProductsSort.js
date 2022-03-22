import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import sortIcon from '../../img/sort-icon.svg'
import ProductsEditComplition from '../ProductsEditComplition/ProductsEditComplition'

const sortTypes = {
  'novelty': 'Новизне',
  'price-decrease': 'Убыванию цены',
  'price-increase': 'Увеличению цены',
}

const ProductsSort = ({sortedProductsLength}) => {
  const [openedMenu, setOpenedMenu] = useState(false)

  const sortType = useSelector((store) => store.app.sortType);

  const dispatch = useDispatch()
  
  const handleChange = (value, name) => {
    dispatch({
      type: 'UPDATE_SORT_TYPE',
      payload: value
    })
    if(window.innerWidth > 480){
      setOpenedMenu(false)
    }
  }

  const removeSortType = () => {
    dispatch({
      type: 'UPDATE_SORT_TYPE',
      payload: 'novelty'
    })
  }

  return(
    <div className='products__sort'>
      <img onClick={() => setOpenedMenu(!openedMenu)} src={sortIcon} alt="" className='products__sort__mobile-btn__img'/>
      <span onClick={() => setOpenedMenu(!openedMenu)} className='products__sort__header'>Сортировать по:</span>
      <div className='products__sort__content-wrapper'>
        <span onClick={() => setOpenedMenu(!openedMenu)} className={`products__sort__text ${openedMenu ? 'products__sort__text_active' : ''}`}>{sortTypes[sortType]}</span>
        <div className={`products__sort__select ${openedMenu ? 'products__sort__select_active' : ''}`}>
          <h3 className='products__sort__header__modal'>Сортировка</h3>
          {/* <label className='products__sort__select__label'>
            <input onClick={() => handleChange('popularity', 'Популярности')} type="radio" name='sortName'/>
              Популярности
          </label> */}
          <label className='products__sort__select__label products__sort__select__label_novelty'>
            <input checked={sortType === 'novelty'} className='products__sort__select__input' onChange={() => handleChange('novelty', 'Новизне')} type="radio" name='sortName'/>
            <span className='products__sort__select__input_custom'></span>
              Новизне
          </label>
          <label className='products__sort__select__label  products__sort__select__label_decrease'>
            <input checked={sortType === 'price-decrease'} className='products__sort__select__input' onChange={() => handleChange('price-decrease', 'Убыванию цены')} type="radio" name='sortName'/>
            <span className='products__sort__select__input_custom'></span>

            Убыванию цены
          </label>
          <label className='products__sort__select__label  products__sort__select__label_increase'>
            <input checked={sortType === 'price-increase'}  className='products__sort__select__input' onChange={() => handleChange('price-increase', 'Увеличению цены')} type="radio" name='sortName'/>
            <span className='products__sort__select__input_custom'></span>
             Увеличению цены
          </label>
          <div onClick={() => setOpenedMenu(false)} className="products__sidebar__closing-cross"></div>
          <ProductsEditComplition actionContent={['sort', sortedProductsLength ]}  handleComplete={() => setOpenedMenu(false)} handleClose={removeSortType}/>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProductsSort)