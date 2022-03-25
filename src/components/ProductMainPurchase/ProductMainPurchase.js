import React from 'react'
import bagIcon from '../../img/product-bag.svg'
import {openPopupboxOneClick} from '../PopUps/PopUps'

const ProductMainPurchase = ({productDataObj}) => {

  return(
    <div className='product__main__purchase'>
      <div className='product__main__purchase__buy'>
        <img className='product__main__purchase__buy__img' src={bagIcon} alt="" />
        <span className='product__main__purchase__buy__text'>Купить</span>
      </div>
      <div onClick={() => openPopupboxOneClick(productDataObj)} className='product__main__purchase__one-click'>
        <span className='product__main__purchase__one-click__text'>Купить в один клик</span>
      </div>
    </div>
  )
}

export default ProductMainPurchase