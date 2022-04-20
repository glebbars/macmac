import React, { useRef } from 'react'

const Search = ({className, placeholder, onType, handleSubmit}) =>{
  const inputRef = useRef(null)

  return(
      <form onSubmit={(event) => handleSubmit(event, inputRef)} className={className}>
        <input ref={inputRef} onChange={(e) => onType(e.target.value)} type="search" className='header__search__input' placeholder={placeholder}/>
    </form>
  )
}

export default Search