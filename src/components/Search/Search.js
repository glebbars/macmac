import React, { useRef } from 'react'
import { useHistory } from "react-router-dom";

const Search = ({className, placeholder, onType, onlyProduct, setTouchedSearch}) =>{
  const inputRef = useRef(null)
  const history = useHistory()


  const handleSubmit = (event, ref) => {
    if(onlyProduct){
      history.push(`/category/${onlyProduct.category.toLowerCase()}/${onlyProduct.id}`)
    } else{
      history.push(`/search/${ref.current.value}`)
    }

    if(setTouchedSearch){
      setTouchedSearch(false)
    }
    
    event.preventDefault()
    ref.current.blur()
    ref.current.value = ""
  }

  return(
      <form onSubmit={(event) => handleSubmit(event, inputRef)} className={className}>
        <input 
          ref={inputRef}
          type="search" 
          className='header__search__input' 
          placeholder={placeholder}
          onChange={(e) => {
            if(onType){
              onType(e.target.value)
            }
          }}
        />
    </form>
  )
}

export default Search