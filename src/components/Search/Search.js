import React from 'react'
import search from "../../img/search.svg"

const Search = ({className, placeholder}) =>{

  return(
      <div className={className}>
        <img src={search} alt="search" />
        <input type="search" className='header__search__input' placeholder={placeholder}/>
    </div>
  )
}

export default Search