import React from 'react'
import {headerCatalogCategories} from '../additionalObjects/additionalObjects'
import {Link} from 'react-router-dom'

const HeaderCatalog = () => {

  return(
    <div className='header__catalog'>
      <div className='header__catalog__content'>
        {headerCatalogCategories.map(category => (

          <div className='header__catalog__content__column'>
            <Link className='header__catalog__content__option__header' to={category.headerLink}>{category.header}</Link>
              {category.options.map(option => (

                <Link className='header__catalog__content__option__text' to={option.link}>{option.name}</Link>
              ))}
          </div>

        ))}
        
      </div>
      <div className='header__catalog__bg-wrapper'></div>

    </div>
  )
}

export default HeaderCatalog