import React from 'react'

const ProductsEditComplition = ({handleComplete, handleClose}) => {

  return(
    <div className='products__edit-complition'>
      <span className='products__edit-complition__text'>168 результатов</span>
      <div className='products__edit-complition__btns-wrapper'>
        <div onClick={handleClose} className='products__edit-complition__btn products__edit-complition__btn_cancel'>Сбросить</div>
        <div onClick={handleComplete}  className='products__edit-complition__btn'>Применить</div>
      </div>
    </div>

  )
}

export default ProductsEditComplition