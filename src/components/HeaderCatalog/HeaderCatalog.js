import React, { forwardRef } from 'react'
import HeaderCatalogColumn from '../HeaderCatalogColumn/HeaderCatalogColumn'
import {headerCatalogCategories, headerCatalogOther} from '../additionalObjects/additionalObjects'
import {Link} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

const HeaderCatalog = ({activeCatalog}) => {

  return(
    <div className={`header__catalog ${activeCatalog ? 'header__catalog_active' : ''}`}>
       <div className='header__catalog__triangle'></div>
       <div className='header__catalog__header'>
          <span className='header__catalog__header__back'></span>
          <h3 className='header__catalog__header__text'>Все товары</h3>
       </div>
        {headerCatalogCategories.map((category, index) => (
          <HeaderCatalogColumn key={index} category={category} />
        ))}
        <div className='header__catalog__other'>
          {headerCatalogOther.map((link, index) => (
            <Link key={index} to={link.link}className='header__catalog__other__link' >{link.text}</Link>
          ))}
          <HashLink 
            scroll={(el) => el.scrollIntoView({ behavior: 'smooth'})}
            className='header__catalog__other__link' 
            to='/#best-sellers'
          >
            Топ продаж
          </HashLink>
          <Link 
            className='header__catalog__other__link header__catalog__other__link_all' 
            to='/category/all-products'
          >
            Все товары
          </Link>
        </div>
    </div>
  )
}

export default HeaderCatalog