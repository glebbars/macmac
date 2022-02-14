import React from 'react'
import search from "../../img/search.svg"

const Search = ({className, iconClassName, placeholder, onType}) =>{

  return(
      <div className={className}>
        <img className={iconClassName} src={search} alt="search" />
        <input onChange={(e) => onType(e.target.value)} type="search" className='header__search__input' placeholder={placeholder}/>
    </div>
  )
}

export default Search