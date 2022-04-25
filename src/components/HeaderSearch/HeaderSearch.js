import React from "react";
import { useState } from "react";
import Search from "../Search/Search";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeaderSearch = () => {
  const productsArr = useSelector((store) => store.app.productsArr)
  const [openedSearchWrapper, setOpenedSearchWrapper] = useState(false)
  const [touchedSearch, setTouchedSearch] = useState(false)
  const [filteredArr, setFilteredArr] = useState([])
  const history = useHistory()

  const handleSubmit = (event, ref) => {
    event.preventDefault()
    setOpenedSearchWrapper(false)
    setTouchedSearch(false)
    history.push(`/search/${ref.current.value}`)
    ref.current.blur()
    ref.current.value = ""
  }

  const habndleType = (text) => {
    if(text.length > 0 && !openedSearchWrapper) {
      setOpenedSearchWrapper(true)
    }

    const filteredArr = productsArr.filter(product => {
      const fullProductName = `${product.brand.toLowerCase()} ${product.category.toLowerCase()} ${product.model.toLowerCase()} ${product.capacity.toLowerCase()} ${product.color.toLowerCase()}`

      return fullProductName.includes(text.toLowerCase())
    })

    return setFilteredArr(filteredArr)
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
        onType={(text) => habndleType(text)} 
        className={`header__search ${touchedSearch ? 'header__search_touched' : ''} ${openedSearchWrapper ? 'header__search_searching' : ''} `} 
        placeholder={openedSearchWrapper ? 'Поиск по товарам' : 'Категория, название товара, артикул'} 
      />

      {filteredArr.length > 0 && (
        <div className={`header__search__result ${openedSearchWrapper ? 'header__search__result_active' : ''}`}>
          <h3 className="header__search__result__header">Товары ({filteredArr.length} резульатов)</h3>
          {filteredArr.map((product, index) => (
            (index < 4) && (
              <div className="header__search__result__product">
                <div className="header__search__result__product__img-wrapper">
                  <img src={product.pictures[0].url} alt="" className="header__search__result__product__img"/>
                </div>
                <div className="header__search__result__product__text-wrapper">  
                  <p className="header__search__result__product__text">{product.brand} {product.category} {product.model} {product.color} {product.capacity}</p>
                  <span className="header__search__result__product__price">{product.price.toLocaleString()}.00&#x20b4;</span>
                </div>
              </div>
              )
          ))}

          <Link className="header__search__result__review-all-link" to='/search/apple'>Посмотреть все результаты</Link>
        </div>
      )}

    </div>
    </>
  )
}

export default HeaderSearch