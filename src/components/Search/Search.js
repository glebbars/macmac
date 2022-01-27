import React from 'react'
import search from "../../img/search.svg"

const Search = (className?) =>{

  return(
    <div className='header__search'>
      <img src={search} alt="search" />
      <input type="search" className='header__search__input' placeholder='Категория, название товара, артикул'/>
    </div>
  )
}

export default Search