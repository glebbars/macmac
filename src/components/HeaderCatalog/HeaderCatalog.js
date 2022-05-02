import React, { forwardRef } from 'react'
import HeaderCatalogColumn from '../HeaderCatalogColumn/HeaderCatalogColumn'
import {headerCatalogCategories, headerCatalogOther} from '../additionalObjects/additionalObjects'
import {Link} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

const HeaderCatalog = ({activeCatalog}) => {

  const DownTopTopHeated = (link) => {
    if(link === '/'){
      console.log('*')
    }
  }

  return(
    <div className={`header__catalog ${activeCatalog ? 'header__catalog_active' : ''}`}>
       <div className='header__catalog__triangle'></div>
        {headerCatalogCategories.map((category, index) => (
          <HeaderCatalogColumn key={index} category={category} />
        ))}
        <div className='header__catalog__other'>
          {headerCatalogOther.map((link, index) => (
            <Link 
              onClick={() => DownTopTopHeated(link.link)}
              key={index} 
              to={link.link}
              to='/#best-sellers'
              className={`header__catalog__other__link ${link.link.includes('all') ? 'header__catalog__other__link_all' : ''}`} 
            >
              {link.text}
            </Link>
          ))}

            <HashLink to='/#best-sellers'>Топ продаж 2</HashLink>
          

        </div>
    </div>
  )
}

export default HeaderCatalog