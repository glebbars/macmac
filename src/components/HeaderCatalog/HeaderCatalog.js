import React, { forwardRef } from 'react'
import HeaderCatalogColumn from '../HeaderCatalogColumn/HeaderCatalogColumn'
import {headerCatalogCategories} from '../additionalObjects/additionalObjects'

const HeaderCatalog = forwardRef((props, divRef) => {

  return(
    <div ref={divRef} className='header__catalog'>
      {/* <div className='header__catalog__bg-wrapper'></div> */}
      <div onMouseLeave={() => divRef.current.style.display = 'none'} className='header__catalog__content-wrapper'>
        <div className='header__catalog__triangle'></div>
        {headerCatalogCategories.map((category, index) => (
          <HeaderCatalogColumn key={index} category={category} />
        ))}
      </div>
    </div>
  )
})

export default HeaderCatalog