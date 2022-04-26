import React, { useEffect } from "react";
import { useState } from "react";
import Search from "../Search/Search";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";


const HeaderSearch = () => {
  const productsArr = useSelector((store) => store.app.productsArr)
  const [searchText, setSearchText] = useState('')
  const [touchedSearch, setTouchedSearch] = useState(false)
  const [filteredArr, setFilteredArr] = useState([])
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    handleToggle()
  }, [location])


  const handleSubmit = (event, ref) => {
    if(filteredArr.length === 1){
      const product = filteredArr[0]

      history.push(`/category/${product.category.toLowerCase()}/${product.id}`)
    } else{
      history.push(`/search/${ref.current.value}`)
    }

    event.preventDefault()
    setTouchedSearch(false)
    ref.current.blur()
    ref.current.value = ""
  }

  const habndleType = (text) => {
    setSearchText(text)
    
    const filteredArr = productsArr.filter(product => {
      const fullProductName = `${product.brand.toLowerCase()} ${product.category.toLowerCase()} ${product.model.toLowerCase()} ${product.capacity.toLowerCase()} ${product.color.toLowerCase()}`

      return fullProductName.includes(text.toLowerCase())
    })

    return setFilteredArr(filteredArr)
  }

  const handleToggle = () => {
    if(touchedSearch){
      setTouchedSearch(false)
    }
  }

  const categoriesArr = filteredArr.map(product => product.category)
  const categorySet = new Set(categoriesArr)
  const categoriesSetArr = Array.from(categorySet)


  return(
    <>
    <div 
      onClick={handleToggle}
      className={`header__search-screen-wrapper ${touchedSearch ? 'header__search-screen-wrapper_touched' : ''} ${(filteredArr.length > 0 || searchText.length > 0) ?'header__search-screen-wrapper_bg' : ''}`}
      >
    </div>
    <div 
      onClick={() => setTouchedSearch(true)} 
      className={`header__search-container ${touchedSearch ? 'header__search-container_touched' : ''}`}>

      <Search 
        handleSubmit={handleSubmit}
        onType={(text) => habndleType(text)} 
        className={`header__search ${touchedSearch ? 'header__search_touched' : ''}`} 
        placeholder={touchedSearch ? 'Поиск по товарам' : 'Категория, название товара, артикул'} 
      />

      {filteredArr.length > 0 && (
        <div className={`header__search__result ${touchedSearch ? 'header__search__result_active' : ''}`}>

          {categoriesSetArr.length > 0 && (
            <div className="header__search__result__categories">
              <h3 className="header__search__result__header">Категории</h3>
              {categoriesSetArr.map((category, index) => (
                <Link key={index} className="header__search__result__categories__link" to={`/search/${category.toLowerCase()}`}>
                  <Highlighter
                    className="header__search__result__categories__text"
                    highlightClassName="header__search__result__categories__text__highlighted"
                    searchWords={[searchText]}
                    autoEscape={true}
                    textToHighlight={category}
                  />
                </Link>
              ))}
            </div>
          )}

          <div className="header__search__result__products">
            <h3 className="header__search__result__header">Товары ({filteredArr.length} резульатов)</h3>
            {filteredArr.map((product, index) => (
              (index < 4) && (
                <div key={index} className="header__search__result__product">
                  <div className="header__search__result__product__img-wrapper">
                    <img src={product.pictures[0].url} alt="" className="header__search__result__product__img"/>
                  </div>
                  <Link to={`/category/${product.category.toLowerCase()}/${product.id}`} className="header__search__result__product__text-wrapper">  
                    <Highlighter
                      className="header__search__result__product__text"
                      highlightClassName="header__search__result__product__highlighted"
                      searchWords={[searchText]}
                      autoEscape={true}
                      textToHighlight={`${product.brand} ${product.category} ${product.model} ${product.capacity} ${product.color}`}
                    />
                    <span className="header__search__result__product__price">{product.price.toLocaleString()}.00&#x20b4;</span>
                  </Link>
                </div>
                )
            ))}
          </div>

          <Link to={`/search/${searchText}`} className="header__search__result__review-all-link">Посмотреть все результаты</Link>
        </div>
      )}

    </div>
    </>
  )
}

export default HeaderSearch
