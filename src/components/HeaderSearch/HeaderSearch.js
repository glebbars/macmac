import React from "react";
import { useState } from "react";
import Search from "../Search/Search";

const HeaderSearch = () => {

  const [openedSearchWrapper, setOpenedSearchWrapper] = useState(false)
  const [touchedSearch, setTouchedSearch] = useState(false)

  return(
    <div onClick={() => {
      setTouchedSearch(true); 
      if(openedSearchWrapper) {
        setOpenedSearchWrapper(false);
        setTouchedSearch(false)
      } 
    }}
    className={`header__search-screen-wrapper ${openedSearchWrapper ? 'header__search-screen-wrapper_active' : ''} ${touchedSearch ? 'header__search-screen-wrapper_mobile' : ''} `}>
    <div className={`header__search-container ${openedSearchWrapper ? 'header__search-container_active' : ''} ${touchedSearch ? 'header__search-container_mobile' : ''}`}>
      <Search onType={(text) => text.length > 0 ? setOpenedSearchWrapper(true) : null} 
      className={`header__search ${openedSearchWrapper ? 'header__search_active' : ''} ${touchedSearch ? 'header__search_mobile' : ''}`} placeholder={openedSearchWrapper ? 'Поиск по товарам' : 'Категория, название товара, артикул'}/>
    </div>
    </div>
  )
}

export default HeaderSearch