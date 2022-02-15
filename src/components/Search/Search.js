import React from 'react'
import search from "../../img/search.svg"

const Search = ({className, placeholder, onType}) =>{

  return(
      <div className={className}>
        <img src={search} alt="search" />
        <input onChange={(e) => onType(e.target.value)} type="search" className='header__search__input' placeholder={placeholder}/>
    </div>
  )
}

export default Search