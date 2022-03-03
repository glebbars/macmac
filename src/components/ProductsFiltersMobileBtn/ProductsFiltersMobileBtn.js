import react from 'react'
import filterIcon from '../../img/filter-icon.svg'

const ProductsFiltersMobileBtn = ({toggleSideBar}) => {
  return(
    <div onClick={toggleSideBar} className='products__filters-mobile-btn'>
      <img className='products__filters-mobile-btn__img' src={filterIcon} alt="" />
      <span className='products__filters-mobile-btn__text'>Фильтры </span>
    </div>
  )
}

export default ProductsFiltersMobileBtn