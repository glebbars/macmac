import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const HeaderCatalogColumn = ({category}) => {
  const [activeOptionsWrapper, setActiveOptionsWrapper] = useState(false)

  if(category.mobileOnly){
    return null
  }

  const handleOptionsWrapper = () => {
    if(window.innerWidth <= 1300){
      console.log('=-=')
      setActiveOptionsWrapper(true)
    }
  }

  const closeWrapper = () => {
    setActiveOptionsWrapper(false)
  }

  return(

    <div className='header__catalog__column'>
      <div style={{background: `${category.bg.color}`}} className='header__catalog__options__img-wrapper'>
          <img className='header__catalog__options__img' src={category.bg.img} alt="" />
      </div>
      <Link
        onClick={handleOptionsWrapper}  
        className='header__catalog__options__header' 
        to={category.headerLink}
      >
        {category.header}
      </Link>

      <div className={`header__catalog__options__wrapper ${activeOptionsWrapper ? 'header__catalog__options__wrapper_active' : ''}`}>
        <div onClick={closeWrapper} className='header__catalog__options__arrow-back'></div>
        <h5 className='header__catalog__options__subheader'>{category.header}</h5>
        {category.options.map((option, index) => (
          <Link 
            key={index} 
            className='header__catalog__options__text' 
            to={option.link}
          >
            {option.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HeaderCatalogColumn