import React from 'react'
import {headerCatalogCategories} from '../additionalObjects/additionalObjects'
import {Link} from 'react-router-dom'

const HeaderCatalog = () => {

  return(
    
    <div className='header__catalog'>
      <div className='header__catalog__triangle'></div>
      {headerCatalogCategories.map((category, index) => (
        <div key={index} className='header__catalog__column'>
          <Link className='header__catalog__option__header' to={category.headerLink}>{category.header}</Link>
            {category.options.map((option, index) => (
              <Link key={index} className='header__catalog__option__text' to={option.link}>{option.name}</Link>
            ))}
        </div>
      ))}
    </div>
  )
}

export default HeaderCatalog