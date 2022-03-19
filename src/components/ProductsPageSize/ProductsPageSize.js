import React, { useState } from 'react'
import { useDispatch } from "react-redux";

const ProductsPageSize = ({sortedProductsLength}) => {
  const [openedMenu, setOpenedMenu] = useState(false)
  const [pageSize, setPageSize] = useState('24 результатов')
  const dispatch = useDispatch()

  const handleChange = (value, name) => {
    setOpenedMenu(false)
    setPageSize(name)
    dispatch({
      type: 'UPDATE_PAGE_SIZE',
      payload: value
    })
  }


  return(
    <div className='products__sort products__depict'>
    <span onClick={() => setOpenedMenu(!openedMenu)} className='products__sort__header'>Отображать:</span>
    <div className='products__sort__content-wrapper'>
      <span onClick={() => setOpenedMenu(!openedMenu)} className={`products__sort__text ${openedMenu ? 'products__sort__text_active' : ''}`}>{pageSize}</span>
      <div className={`products__sort__select  ${openedMenu ? 'products__sort__select_active' : ''}`}>
        <label className='products__sort__select__label'>
          <input onClick={() => handleChange(24, '24 результатов')} type="radio" name='sortName'/>
          24 результатов
        </label>
        <label className='products__sort__select__label'>
          <input onClick={() => handleChange(48, '48 результатов')} type="radio" name='sortName'/>
          48 результатов
        </label>
        <label className='products__sort__select__label'>
          <input onClick={() => handleChange(64, '64 результатов')}  type="radio" name='sortName'/>
          64 результатов
        </label>
      </div>
    </div>
  </div>
  )
}

export default ProductsPageSize