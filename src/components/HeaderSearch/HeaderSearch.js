import React from "react";
import { useState } from "react";
import Search from "../Search/Search";
import { useHistory } from "react-router-dom";

const HeaderSearch = () => {
  const [openedSearchWrapper, setOpenedSearchWrapper] = useState(false)
  const [touchedSearch, setTouchedSearch] = useState(false)
  const history = useHistory()

  const handleSubmit = (event, ref) => {
    event.preventDefault()
    setOpenedSearchWrapper(false)
    setTouchedSearch(false)
    history.push(`/search/${ref.current.value}`)
    ref.current.blur()
    ref.current.value = ""
  }

  return(
    <>
    <div onClick={() => {
      setTouchedSearch(false); 
      if(openedSearchWrapper) {
        setOpenedSearchWrapper(false);
      } 
    }}
    className={`header__search-screen-wrapper ${openedSearchWrapper ? 'header__search-screen-wrapper_searching' : ''} ${touchedSearch ? 'header__search-screen-wrapper_touched' : ''} `}></div>
    <div 
      onClick={() => setTouchedSearch(true)} 
      className={`header__search-container ${touchedSearch ? 'header__search-container_touched' : ''} ${openedSearchWrapper ? 'header__search-container_searching' : ''}`}>

      <Search 
        handleSubmit={handleSubmit}
        onType={(text) => text.length > 0 ? setOpenedSearchWrapper(true) : null} 
        className={`header__search ${touchedSearch ? 'header__search_touched' : ''} ${openedSearchWrapper ? 'header__search_searching' : ''} `} 
        placeholder={openedSearchWrapper ? 'Поиск по товарам' : 'Категория, название товара, артикул'} 
      />
    </div>
    </>
  )
}

export default HeaderSearch