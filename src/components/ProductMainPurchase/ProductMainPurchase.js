import React, {useState} from 'react'
import bagIcon from '../../img/product-bag.svg'
import {openPopupboxOneClick} from '../PopUps/PopUps'

const ProductMainPurchase = () => {
  const [oneClickForm, setOneClickForm] = useState(false)
  const [bagForm, setBagForm] = useState(false)

  return(
    <div className='product__main__purchase'>
      <div className='product__main__purchase__buy'>
        <img className='product__main__purchase__buy__img' src={bagIcon} alt="" />
        <span className='product__main__purchase__buy__text'>Купить</span>
      </div>
      <div onClick={openPopupboxOneClick} className='product__main__purchase__one-click'>
        <span className='product__main__purchase__one-click__text'>Купить в один клик</span>
      </div>
    </div>
  )
}

export default ProductMainPurchase